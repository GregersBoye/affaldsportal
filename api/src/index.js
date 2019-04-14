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


app.get('/address/getId', async (req, res) => {
    const data = await portal.getId(req.query.materialid);
    res.send(data);
});

app.get('/address/getServices', async (req, res) => {
    const data = await portal.getServices(req.query.addressId);
    res.send(data);
});

app.get('/address/getAddress', async (req, res) => {
    const data = await portal.getAddress(req.query.address);
    res.send(data);
});

app.get('/db', (req, res) => {
   con.query('show databases', (error, result) => {

       res.send(result);
   })
});

app.get('/address/ical', async (req, res) => {
    const cal = ical({domain: 'github.com', name: 'my first iCal'});
    const data = await portal.getServices(req.query.addressId);

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

});
