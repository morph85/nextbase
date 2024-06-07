
const DatabaseConfig = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    // dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT || "", 10),
    // logging: process.env.DB_LOGGING
  },
  production: {
    database: process.env.PROD_DB_NAME,
    // dialect: process.env.PROD_DB_DIALECT,
    replication: {
      read: [
        {
          host: process.env.PROD_DB_RPOINT,
          username: process.env.PROD_DB_USERNAME,
          password: process.env.PROD_DB_PASSWORD,
        },
      ],
      write: {
        host: process.env.PROD_DB_EPOINT,
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
      },
    },
    port: parseInt(process.env.PROD_DB_PORT || "", 10),
    logging: false,
    pool: {
      max: 10,
      min: 1,
      acquire: 30000,
    },
  },
}

export default DatabaseConfig
