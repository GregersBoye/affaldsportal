const express = require('express');
const app = express();
const ical = require('ical-generator');
const port = 4000;
const moment = require('moment');
const Portal = require('./interfaces/AffaldsPortal');

const portal = new Portal();

app.get('/address/getId', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = await portal.getId(req.query.materialid);
    res.send(data);
});

app.get('/address/getServices', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = await portal.getServices(req.query.addressId);
    res.send(data);
});

app.get('/address/getAddress', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const data = await portal.getAddress(req.query.address);
    res.send(data);
});

app.get('heartbeat', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('ok');
});

app.get('/address/ical', async (req, res) => {

    const cal = ical({domain: 'gregersboye.com', name: 'Affaldsafhentning'});
    const data = await portal.getServices(req.query.addressId);
    let format = 'ical';

    if(typeof req.query.format !== 'undefined'){
        format = req.query.format;
    }

    if(format.toLowerCase() === 'json'){
        const result = data.reduce((accumulator, service) => {
            const dayList = service.days.map((day) => {
                return day.slice(-10);
            });

            accumulator[service.service]  = dayList;
            return accumulator
        }, {});

        res.send(result);
        return;
    }

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

     cal.serve(res);
});

app.listen(port, () =>{
    console.log(`Listening to port ${port}`);
});
