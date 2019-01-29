
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('nightlife_preferences').del()
    .then(function () {
      // Inserts seed entries
      return knex('nightlife_preferences').insert([
        {id: 5000, Nightclub: 5, Bar: 4, Pub: 1},
        {id: 5001, Nightclub: 3, Bar: 5, Pub: 1},
        {id: 5002, Nightclub: 1, Bar: 5, Pub: 4},
      ]);
    });
};
