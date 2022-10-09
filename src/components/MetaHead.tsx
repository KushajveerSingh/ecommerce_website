import Head from 'next/head';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  children?: ReactNode;
}

const MetaTags = (props: Props) => {
  const { title, description, url, image, children } = props;
  const fullUrl = url ? process.env.NEXT_PUBLIC_BASE_URL + url : process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      {fullUrl && (
        <>
          <meta property="og:url" content={fullUrl} />
          <meta property="twitter:domain" content={fullUrl} />
          <meta property="twitter:url" content={fullUrl} />
        </>
      )}

      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      )}

      {children}
    </Head>
  );
};

export default MetaTags;
