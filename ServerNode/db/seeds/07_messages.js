
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {id: 7000, text: 'hello', group_id: 3000, user_id:6000},
        {id: 7001, text: 'there', group_id: 3000, user_id:6000},
        {id: 7002, text: 'general', group_id: 3000, user_id:6001},
        {id: 7003, text: 'kenobi', group_id: 3000, user_id:6001},
        {id: 7004, text: 'hello', group_id: 3001, user_id:6002},
        {id: 7005, text: 'is there anybody in there', group_id: 3001, user_id:6002},
        {id: 7006, text: 'test', group_id: 3001, user_id:6000},
      ]);
    });
};
