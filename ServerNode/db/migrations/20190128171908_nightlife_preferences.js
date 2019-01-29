
exports.up = function(knex, Promise) {
    return knex.schema.createTable('nightlife_preferences', function (table) {
        table.increments();
        table.integer("Nightclub").notNullable();
        table.integer("Bar").notNullable();
        table.integer("Pub").notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('nightlife_preferences');
};
