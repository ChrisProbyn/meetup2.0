
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("username").notNullable();
        table.integer('location_id').references('id').inTable('locations');
        table.integer('group_id').references('id').inTable('groups');
        table.integer('food_preferences_id').references('id').inTable('food_preferences');
        table.integer('nightlife_preferences_id').references('id').inTable('nightlife_preferences');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
