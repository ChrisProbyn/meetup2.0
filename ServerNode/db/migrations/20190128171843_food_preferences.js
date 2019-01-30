
exports.up = function(knex, Promise) {
    return knex.schema.createTable('food_preferences', function (table) {
        table.increments();
        table.integer("Asian").notNullable();
        table.integer("Bar_food").notNullable();
        table.integer("Steak").notNullable();
        table.integer("Pizza").notNullable();
        table.integer("BBQ").notNullable();
        table.integer("Mexican").notNullable();
        table.integer("Italian").notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('food_preferences');
};
