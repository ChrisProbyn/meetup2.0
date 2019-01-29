
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        {id: 3000, Group_name: 'Group 1'},
        {id: 3001, Group_name: 'Group 2'},
        {id: 3002, Group_name: 'Group 3'},
      ]);
    });
};
