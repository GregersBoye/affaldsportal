const ical = require('ical-generator');
const moment = require('moment');

class Ical {
  constructor(data) {
    const cal = ical({domain: 'gregersboye.com', name: 'Affaldsafhentning'});
    data.forEach((type) => {
      type.days.forEach((day) => {
        const result = day.slice(-10);

        cal.createEvent({
          start: moment(result, "DD-MM-YYYY"),
          end: moment(result, "DD-MM-YYYY").add(1, 'hour'),
          summary: type.service,
          description: `Afhentning af ${type.service}`
        });

      });
    });

    return cal;

  }
}

module.exports = Ical;
