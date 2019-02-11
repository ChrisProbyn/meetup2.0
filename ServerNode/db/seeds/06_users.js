const bcrypt = require('bcrypt');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 6000, email: "example1@gmail.com",password:bcrypt.hashSync("123", 10), username: "bob", location_id: 1003, food_preferences_id: 4000, nightlife_preferences_id: 5000},
        {id: 6001, email: "Alice@gmail.com",password:bcrypt.hashSync("456", 10), username: "Alice", location_id: 1004, food_preferences_id: 4001, nightlife_preferences_id: 5001},
        {id: 6002, email: "example2@gmail.com",password:bcrypt.hashSync("123", 10), username: "Fred", location_id: 1005, food_preferences_id: 4002, nightlife_preferences_id: 5002},
      ]);
    });
};
