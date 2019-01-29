
exports.up = function(knex, Promise) {
    return knex.schema.createTable('places', function (table) {
        table.increments();
        table.string('type').notNullable();
        table.string('place_name').notNullable();
        table.decimal('rating').notNullable();
        table.integer('location_id').references('id').inTable('locations');

      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('places');
};
