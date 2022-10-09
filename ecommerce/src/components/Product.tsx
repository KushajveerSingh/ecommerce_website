import Link from 'next/link';

import type { ProductType } from '../utils/sanityTypes';
import { urlFor } from '../utils/sanityClient';

interface Props {
  product: ProductType;
}

const Product = ({ product }: Props) => {
  const { image, name, slug, price } = product;
  if (slug == null) {
    return null;
  }

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
