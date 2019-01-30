
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('places').del()
    .then(function () {
      return knex('places').insert([
        {id: 2000, type: "bar",place_name:"The Diamond", rating: 4.2, location_id: 1000},
        {id: 2001, type: "steak",place_name:"The Keg", rating: 4.0, location_id: 1001},
        {id: 2002, type: "Italian",place_name:"Pepino's Spaghetti", rating: 5.0, location_id: 1002},
      ]);
    });
};
