import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  target: 'https://cloud.appwrite.io',
  changeOrigin: true,
});

export default function (app) {
  app.use('/v1', proxy);
}
