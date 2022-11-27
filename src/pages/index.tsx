import type { ProductType, BannerType } from '../utils/sanityTypes';

import { client } from '../utils/sanityClient';
import { FooterBanner, MetaTags, Product, HeroBanner } from '../components';

interface Props {
  products: ProductType[];
  bannerData: BannerType[];
}

const Home = ({ products, bannerData }: Props) => {
  return (
    <>
      <MetaTags
        title="Headphone Shop"
        description="Fully responsive ecommerce website built using Next.js, Stripe and Sanity. Manage entire content of website using Sanity, and use Stipe for managing payments, shipping rates and entire checkout process."
        image="/demo_image.png"
        url="https://github.com/KushajveerSingh/ecommerce_website"
      >
        <link rel="manifest" href="/manifest.json" />
      </MetaTags>

      <HeroBanner heroBanner={bannerData && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
