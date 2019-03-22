const express = require('express');
const app = express();
const axios = require('axios');
const ical = require('ical-generator');
const port = 3000;
const moment = require('moment');
const uniqid = require('uniqid');
const path = require('path');
const mysql = require('mysql');
const Portal = require('./interfaces/AffaldsPortal');

const portal = new Portal();
const  con = mysql.createConnection({
    host: "mysql",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
const cal = ical({domain: 'github.com', name: 'my first iCal'});

app.get('/address/getId', async (req, res) => {
    const data = await portal.getId(req.query.materialid);
    res.send(data);
});

app.get('/address/getServices', async (req, res) => {
    const data = await portal.getServices(req.query.addId);
    res.send(data);
});

app.get('/address/getAddress', async (req, res) => {
    const data = await portal.getAddress(req.query.address);
    res.send(data);
});

app.get('/db', (req, res) => {
   con.query('show databases', (error, result) => {
       console.log(result);
       res.send(result);
   })
});

app.get('/address/ical', (req, res) => {
    cal.createEvent({
        start: moment(),
        end: moment().add(1, 'hour'),
        summary: 'Example Event',
        description: 'It works ;)',
        url: 'http://sebbo.net/'
    });
    const icalPath = path.join(__dirname, '..', 'calendars', `${uniqid()}.ics`);
    cal.saveSync(icalPath);
    res.send(icalPath);
});

app.listen(port, () =>{

});
