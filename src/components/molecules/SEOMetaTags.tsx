import { Helmet } from "react-helmet-async";

export function SEOMetaTags({ title, desc }: { title: string; desc: string }) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={desc} />
      <meta name="keywords" content="book, bookshelf, tag, rating" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="BOOKSHELF : 나의 온라인 책장" />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content="src/og-image.png" />
      <meta property="og:url" content="https://bookshelf-bay.vercel.app/" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content="src/og-image.png" />

      <link rel="canonical" href="https://bookshelf-bay.vercel.app/" />
    </Helmet>
  );
}
