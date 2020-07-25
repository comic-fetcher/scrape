module.exports = {
  type: process.env.CF_TYPEORM_CONNECTION,
  host: process.env.CF_TYPEORM_HOST,
  port: process.env.CF_TYPEORM_PORT,
  username: process.env.CF_TYPEORM_USERNAME,
  password: process.env.CF_TYPEORM_PASSWORD,
  database: process.env.CF_TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/typeorm/entities/**/*.ts"],
  migrations: ["src/typeorm/migrations/**/*.ts"],
  subscribers: ["src/typeorm/subscribers/**/*.ts"],
};
