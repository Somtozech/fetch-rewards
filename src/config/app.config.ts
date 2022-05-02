import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  envName: process.env.NODE_ENV,
  apiPrefix: 'api',
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  newsApiKey: process.env.NEWS_API_KEY,
}));
