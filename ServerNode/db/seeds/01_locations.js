
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      return knex('locations').insert([
        {id: 1000, lat: 49.2832, long: -123.1040},
        {id: 1001, lat: 49.2834, long: -123.1164},
        {id: 1002, lat: 49.2789, long: -123.0706},
        {id: 1003, lat: 49.281372, long: -123.114542},
        {id: 1004, lat: 49.2844, long: -123.1089},
        {id: 1005, lat: 49.2757, long: -123.1199},
        
      ]);
    });
};
