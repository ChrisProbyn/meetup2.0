
exports.up = function(knex, Promise) {
    return knex.schema.createTable('members', function (table) {
        table.increments();
        table.integer('group_id').references('id').inTable('groups');
        table.integer('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('members');
};
