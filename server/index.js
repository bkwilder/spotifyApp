require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const querystring = require("querystring");
const axios = require("axios");
const PORT = process.env.PORT || 8080;
const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

module.exports = app;
app.listen(PORT, () => console.log(`Connected to port: ${PORT}`));

// logging middleware
app.use(morgan("dev"));

// static middleware
app.use(express.static(path.join(__dirname, "..", "node_modules")));
app.use(express.static(path.join(__dirname, "..", "public")));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/login", (req, res, next) => {
  try {
    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + CLIENT_ID;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(REDIRECT_URI);
    url += "&show_dialog=true";
    url +=
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private user-top-read";
    res.redirect(url);
  } catch (error) {
    next(error);
  }
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const client = `${CLIENT_ID}:${CLIENT_SECRET}`;
  let params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: params,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(client).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, token_type } = response.data;
        res.redirect(
          `http://localhost:8080/top-tracks?accesstoken=${access_token}&refreshtoken=${refresh_token}&tokentype=${token_type}`
        );
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/tracks", async (req, res, next) => {
  const token_type = req.query.tokentype;
  const access_token = req.query.accesstoken;
  axios
    .get("https://api.spotify.com/v1/me/top/artists?limit=50", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    })
    .then((response) => {
      const artistIds = response.data.items.map((artist) => artist.id);
      res.send(artistIds);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/genres", async (req, res, next) => {
  const token_type = req.query.tokentype;
  const access_token = req.query.accesstoken;
  const artistIds = req.query.trackids;
  axios
    .get(`https://api.spotify.com/v1/artists?limit=50&ids=${artistIds}`, {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      console.log(response.data.artists.map((artist) => artist.genres));
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ? res.status(404).send("Not found") : next()
);

// send index.html to use SPA, all paths send the index.html file
app.use("*", (req, res, next) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// error handling endware, 500 status is not sent to server so this allows us to log the error and see it.
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || "Internal server error.")
);
