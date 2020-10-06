//Get requirements
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
let mongoose = require("mongoose");
const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
};

app.use(cors(corsOptions));
app.options("*", cors());

const mongoPass = process.env.MONGO_PASS;
const mongoUser = process.env.MONGO_USER;
const mongoDbName = process.env.MONGO_DB_NAME;
//Set up default mongoose connection
let mongoDB =
  `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.gylxs.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let Schema = mongoose.Schema;

let AreaInfoSchema = new Schema({
  area_id: Number,
  area_name: String,
  area_restrictions: Object,
});

// Compile model from schema
let AreaInfoModel = mongoose.model("AreaInfoModel", AreaInfoSchema);

async function getAdminDistrict(postcode) {
  let fixedPostcode = postcode.replace(/ /g, "");
  return axios
    .get(`https://api.postcodes.io/postcodes/${fixedPostcode}`)
    .then((res) => {
      return res.data.result.admin_district;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getAreaInfo(adminDistrict) {
  return AreaInfoModel.find({
    area_name: adminDistrict, // search query
  })
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      console.error(err);
    });
}

app.use(bodyParser.json());

//Define global consts

const port = process.env.NODE_PORT || process.env.PORT;
const apiKey = process.env.VUE_APP_GIPHY_KEY;

app.post("/areainfo", (req, res) => {
  getAdminDistrict(req.body.postcode).then((area) => {
    console.log(area);
    if (area == null) {
      res.json({ error: "Sorry, postcode not recognised!" });
      return;
    }
    AreaInfoModel.findOne({ area_name: area }, function(err, areaInfo) {
      if (err) return err;
      if (areaInfo == null) {
        res.json({
          error: "No info for this area, default restrictions may apply",
        });
        return;
      }
      res.send(areaInfo);
    });
  });
});

app.get("/lockdowngif", (req, res) => {
  axios
    .get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}=boris+johnson`)
    .then((gif) => {
      let url =
        gif.data.data[Math.floor(1 + Math.random() * 30)].images.original.url;
      res.json({ url });
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
