'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_tables', function(table){
    table.increments();
    table.integer('user_id').index().references('id').inTable('users');
    table.integer('task_id').index().references('id').inTable('tasks');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_tables');
};
