const moment = require('moment');

class Json {
  constructor(data) {
    return data.reduce((accumulator, service) => {
      accumulator[service.service]  = service.days.map((day) => {
        const date = day.slice(-10); // 'Removed "xxxdag den " from date
        return moment(date, "DD-MM-YYYY").toISOString();
      });
      return accumulator
    }, {});
  }
}

module.exports = Json;
