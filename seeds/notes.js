
exports.seed = function(knex, Promise) {
  return knex('notes').del()
    .then(function () {
      return Promise.all([
        knex('notes').insert({comments:'Remember to have the chart in hand for the appointment.', event_id:2})
      ]);
    });
};
