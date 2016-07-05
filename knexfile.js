'use strict';

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgres://localhost/habitat',
    pool: {
      min: 1,
      max: 1
    }
  }
};
