import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Layout from '@/components/layout';

const FirstPost: FC = () => {
	return (
		<Layout>
			<Head>
				<title>First Post</title>
			</Head>
			{/* <Image

			/> */}

			{/* <h2>
				<Link href="/">← Back to home</Link>
			</h2> */}
		{/* </> */}
		</Layout>
	);
};
export default FirstPost;
