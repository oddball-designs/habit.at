'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_tasks', function(table){
    table.increments();
    table.integer('user_id').index();
    table.integer('task_id').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_tasks');
};
