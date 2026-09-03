// server/helpers/paypal.js
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "",
  client_secret: "",
});

module.exports = paypal;