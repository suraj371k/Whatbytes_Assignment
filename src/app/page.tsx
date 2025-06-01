import React, { Suspense } from 'react';
import Products from './products/page';

export default function Home() {
  return (
    <div className="mt-5 w-full gap-10 flex container mx-auto justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>
    </div>
  );
}
