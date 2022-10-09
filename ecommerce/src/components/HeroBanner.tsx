import Link from 'next/link';
import type { BannerType } from '../utils/sanityTypes';
import { urlFor } from '../utils/sanityClient';

interface Props {
  heroBanner?: BannerType;
}

const HeroBanner = ({ heroBanner }: Props) => {
  if (!heroBanner) {
    return null;
  }

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt={heroBanner.product}
          className="hero-banner-image"
        />

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
