
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
        {id: 8000, group_id: 3000, user_id: 6000},
        {id: 8001, group_id: 3001, user_id: 6000},
        {id: 8002, group_id: 3000, user_id: 6001},
        {id: 8003, group_id: 3001, user_id: 6002},
      ]);
    });
};
