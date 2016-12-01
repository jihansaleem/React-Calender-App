
exports.up = function(knex, Promise) {
     return knex.schema.createTableIfNotExists('notes', function (table) {
        table.increments('id').primary(); 
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('comments'); 
        table.integer('event_id').notNullable()
     
    })  
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notes') 
  
};
