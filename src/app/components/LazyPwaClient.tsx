'use client';

import dynamic from 'next/dynamic';

const DeferredPwaClient = dynamic(() => import('./PwaClient'), {
  ssr: false,
});

export default function LazyPwaClient() {
  return <DeferredPwaClient />;
}
