/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    nextPublicApiUrl: process.env.NEXT_COUNTRIES_TREVORBLADES_GRAPH_QL_URL || 'https://countries.trevorblades.com/graphql',
  },
};

export default nextConfig;
