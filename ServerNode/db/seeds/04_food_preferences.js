
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('food_preferences').del()
    .then(function () {
      // Inserts seed entries
      return knex('food_preferences').insert([
        {id: 4000, Asian: 4, Bar_food: 4, Steak: 1, Pizza: 3, BBQ: 2, Mexican: 1, Italian: 5, },
        {id: 4001, Asian: 5, Bar_food: 2, Steak: 5, Pizza: 2, BBQ: 2, Mexican: 4, Italian: 2, },
        {id: 4002, Asian: 2, Bar_food: 3, Steak: 4, Pizza: 4, BBQ: 1, Mexican: 5, Italian: 3, },
      ]);
    });
};
