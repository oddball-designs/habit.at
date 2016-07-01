'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('password');
    table.string('email');
    table.integer('phone_number');
    table.boolean('is_Admin');
    table.integer('households_id').index().references('id').inTable('households');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
