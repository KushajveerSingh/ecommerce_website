import type { ProductType, BannerType } from '../utils/sanityTypes';

import { client } from '../utils/sanityClient';
import { FooterBanner, MetaHead, Product, HeroBanner } from '../components';

interface Props {
  products: ProductType[];
  bannerData: BannerType[];
}

const Home = ({ products, bannerData }: Props) => {
  return (
    <>
      <MetaHead
        title="Modern Headphone Shop"
        description="Modern full stack ecommerce website built with Next.js"
      >
        <link rel="manifest" href="/manifest.json" />
      </MetaHead>

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
