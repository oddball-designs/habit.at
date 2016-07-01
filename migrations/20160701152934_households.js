'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('households', function(table){
    table.increments();
    table.string('name');
    table.string('password');
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('households');
};
