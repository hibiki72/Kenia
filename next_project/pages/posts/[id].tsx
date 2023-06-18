import { FC } from 'react';
import Layout from '@/components/layout';
import type { GetStaticProps } from 'next';
import { getAllPostIds, getPostData } from '@/lib/posts';
import Head from "next/head";
import Date from "@/components/date";
import utilStyles from "@/styles/utils.module.css";

export const getStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params?.id as string);
    return {
        props: {
            postData,
        }
    }
}

type PostData = {
    postData: {
        id: string;
        title: string;
        data: string;
        contentHtml: string;
        datae: string;
    }
}

// const Post: FC = () => {
const Post: FC<PostData> = ({ postData }) => {
	// return <Layout>...</Layout>;
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>

			{/* {postData.title}
			<br />
			{postData.id}
			<br />
			<Date dateString={postData.date} />
			<br />
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
            
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>

        </Layout>
    )
};
export default Post;