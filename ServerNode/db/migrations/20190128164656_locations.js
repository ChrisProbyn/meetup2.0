
exports.up = function(knex, Promise) {
    return knex.schema.createTable('locations', function (table) {
        table.increments();
        table.decimal('lat', 14, 6).notNullable();
        table.decimal('long', 14, 6).notNullable();

      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('locations');
};
