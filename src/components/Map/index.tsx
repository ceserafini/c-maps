import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/src/components/Map/LeafletMap'), {
  ssr: false,
});

export default LeafletMap;
