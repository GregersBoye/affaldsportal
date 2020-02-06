const express = require('express');
const app = express();

const JsonGenerator = require('./Generators/Json');
const IcalGenerator = require('./Generators/Ical');
const port = 4000;

const Portal = require('./interfaces/AffaldsPortal');

const portal = new Portal();

app.get('/address/getId/:materialId', async (req, res) => {
  console.log('address/getId was called');
  res.header("Access-Control-Allow-Origin", "*");
  const data = await portal.getId(req.params.materialid);
  res.send(data);
});

app.get('/address/getServices/:addressId', async (req, res) => {
  console.log('address/getServices was called');
  res.header("Access-Control-Allow-Origin", "*");
  const data = await portal.getServices(req.params.addressId);
  res.send(data);
});

app.get('/address/getAddress/:address', async (req, res) => {
  console.log('address/getAddress was called');
  res.header("Access-Control-Allow-Origin", "*");
  const data = await portal.getAddress(req.params.address);
  res.send(data);
});

app.get('/heartbeat/:parameter', (req, res) => {
  console.log(`heartbeat was called ${req.params.parameter}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.send('ok');
});

app.get('/address/ical/:addressId', async (req, res) => {
  console.log(`address/ical was called with id ${req.params.addressId}`);
  const data = await portal.getServices(req.params.addressId);

  const cal = new IcalGenerator(data);
  cal.serve(res);
});

app.get('/address/json/:addressId', async (req, res) => {
  console.log(`address/json was called with id ${req.params.addressId}`);
  const data = await portal.getServices(req.params.addressId);

  res.send(new JsonGenerator(data));
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
