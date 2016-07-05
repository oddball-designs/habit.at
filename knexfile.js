'use strict';

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/habitat',
    pool: {
      min: 1,
      max: 1
    }
  },

  test: {
    client: 'postgres',
    connection: 'postgres://postgres@localhost/test_db',
    pool: {
      min: 1,
      max: 1
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
