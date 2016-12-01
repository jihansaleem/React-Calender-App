
exports.up = function(knex, Promise) {
     return knex.schema.createTableIfNotExists('events', function (table) {
        table.increments('id').primary(); 
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
        table.string('from').notNullable();
        table.string('to').notNullable();
        table.string('title'); 
        table.string('type');
        table.string('location')
    })  
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events') 
  
};
