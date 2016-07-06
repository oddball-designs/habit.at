'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('password');
    table.string('email');
    table.string('phone_number');
    table.boolean('is_admin');
    table.integer('household_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
