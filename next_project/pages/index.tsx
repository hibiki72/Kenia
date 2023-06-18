import Link from 'next/link';
import Head from 'next/head';
import Layout, {siteTitle} from '@/components/layout';
import utilStyles from '@/styles/utils.module.css';
import { getSortedPostsData } from "@/lib/posts"
import type { PostData } from "@/lib/posts"
import Date from '../components/date';

type Props = {
  allPostsData: PostData[];
}
export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}

export default function Home({ allPostsData }: Props) {
	return (
		<Layout home>

			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						/* <li className={utilStyles.listItem} key={id}>

						</li> */
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>{title}</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
