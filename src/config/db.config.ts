import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    logging: false,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    autoLoadEntities: true,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    entities: ['dist/**/*.entity.ts'],
    dropSchema: true,
    extra: {
      ssl: process.env.DATABASE_SSL === 'true',
    },
  };
});
