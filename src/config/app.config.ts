import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    currencyApiToken: process.env.CURRENCY_API_TOKEN,
    rabbitmqUrl: process.env.RABBITMQ_URL,
    storageUrl: process.env.STORAGE_URL,
  };
});
