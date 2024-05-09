import "dotenv/config";
import mysql from "mysql2";
import express from "express";
import bodyParser from "body-parser";


const app = express();

// support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;

// api call (tests backend connection w/o db hookup)
app.get("/", (re, res) => {
  return res.json("You are looking at the backend (server-side).");
});

// run the server
app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

// connect to db
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

let db = mysql.createConnection(urlDB);

db.connect((err) => {
  if (err) throw err;
  console.log(`mysql connected on port ${process.env.MYSQLPORT}`);
});

// NEW - Add CORS headers - see https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
});

/*
// endpoints
app.get("/states", (req, res) => {
  let sqlGet = "SELECT abbr FROM states";
  db.query(sqlGet, (error, result) => {
    if (error) return res.json(error);
    return res.json(result);
  });
});

app.get("/accreditations", (req, res) => {
  let sqlGet = "SELECT accreditation FROM accreditation";
  db.query(sqlGet, (error, result) => {
    if (error) return res.json(error);
    return res.json(result);
  });
});

app.get("/panels", (req, res) => {
  let sqlGet = "SELECT panel, label, color FROM panels";
  db.query(sqlGet, (error, result) => {
    if (error) return res.json(error);
    return res.json(result);
  });
});

app.get("/registeredLabs", (req, res) => {
  let sqlGet =
    "SELECT id, lab_name, street_address, city, zipcode, accreditation, clia_number, panels, website, email, phone_no FROM registeredLabs";
  db.query(sqlGet, (error, result) => {
    if (error) return res.json(error);
    return res.json(result);
  });
});
*/

app.post("/addFishingSite", (req, res) => {
  let data = req.body;
  let sqlPost = `INSERT INTO fishingSites (siteName,siteType,longitude,latitude,siteURL,descrb,showInDropdown) 
    VALUES ("${data.siteName}", "${data.siteType}", "${data.longitude}","${data.latitude}","${data.siteURL}", "${data.desrb}", "${data.showInD}")`;
  db.query(sqlPost, (error, result) => {
    if (error) return res.json(error);
    res.send({
      message: "New fishing site added.",
    });
  });
});
