/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: `https://chat.openai.com ${process.env.DOMAIN} http://localhost:3000`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
