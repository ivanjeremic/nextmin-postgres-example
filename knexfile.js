module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/artists',
    migrations: {
      tableName: 'artists'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: 'artists'
    }
  }
};
