const bcrypt = require('bcrypt');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 6000, email: "example1@gmail.com",password:"123", username: "bob", location_id: 1003, food_preferences_id: 4000, nightlife_preferences_id: 5000},
        {id: 6001, email: "Alice@gmail.com",password:"456", username: "Alice", location_id: 1004, food_preferences_id: 4001, nightlife_preferences_id: 5001},
        {id: 6002, email: "example2@gmail.com",password:"123", username: "Fred", location_id: 1005, food_preferences_id: 4002, nightlife_preferences_id: 5002},
        {id: 6003, email: "chris@gmail.com",password:"123", username: "Chris", location_id: 1006, food_preferences_id: 4002, nightlife_preferences_id: 5002}
      ]);
    });
};
