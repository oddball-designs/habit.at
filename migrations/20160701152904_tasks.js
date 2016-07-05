'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', function(table){
    table.increments();
    table.string('title');
    table.text('description');
    table.integer('user_id').index().references('id').inTable('users');
    table.boolean('is_weekly');
    table.boolean('is_complete');
    table.timestamp('creation_date');
    table.timestamp('completion_date');
    table.string('due_date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};
