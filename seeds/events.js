
exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({from:'11AM', to:'2PM',title:'Lunch',type:'Party',location:'Lone Star,Milton'}),
        knex('events').insert({from:'10AM', to:'11am',title:'Immunization',type:'Doctor',location:'Family Medical Center'}),
        knex('events').insert({from:'5PM', to:'6PM',title:'Volleyball class',type:'Sports',location:'Milton Dist Highschool'})
      ]);
    });
};
