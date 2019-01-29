
exports.up = function(knex, Promise) {
    return knex.schema.createTable('messages', function (table) {
        table.increments();
        table.string("text").notNullable();
        table.integer('group_id').references('id').inTable('groups');
        table.integer('user_id').references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('messages');
};
