import type { NextPage } from 'next';

import { MetaHead } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <MetaHead
        title="Modern Ecommerce Website"
        description="Modern full stack ecommerce website built with Next.js"
      >
        <link rel="manifest" href="/manifest.json" />
      </MetaHead>
      Hello
    </div>
  );
};

export default Home;
