import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from "remark";
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), 'posts');
export type PostData = {
	id: string;
	date: string;
	title: string;
};
export const getSortedPostsData = (): PostData[] => {
	// /postsディレクトリ内のファイル名を得る
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// 拡張子".md"をファイル名から除く
		const id = fileName.replace(/\.md$/, '');
		// マークダウンファイルを文字列として読み込む
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		// gray-matterでpostのメタデータ部分を解析する
		const matterResult = matter(fileContents);
		// 取り出したデータにidを組み合わせる
		return {
			id,
			...matterResult.data as {date: string; title: string, data: string;},
		};
	});
	// postを日付順に並べ替える
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
};

export const getAllPostIds = () => {
	const fileNames = fs.readdirSync(postsDirectory);
	/* つぎのような配列が返される:
	[
		 {
			 params: {
				 id: 'ssg-ssr'
			 }
		 },
		 {
			 params: {
				 id: 'pre-rendering'
			 }
		 }
	] */
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
};

// export const getPostData = (id: string) => {
export const getPostData = async (id: string) => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    // gray-matterで投稿ファイルのメタデータを取り出す
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
    return {
        id,
        ...matterResult.data,
        contentHtml,
    }
}
