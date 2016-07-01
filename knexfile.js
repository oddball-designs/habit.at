'use strict';

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/habitat',
    pool: {
      min: 1,
      max: 1
    }
  }
};
