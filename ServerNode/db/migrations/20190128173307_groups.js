
exports.up = function(knex, Promise) {
    return knex.schema.createTable('groups', function (table) {
        table.increments();
        table.string("Group_name").notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('groups');
};
