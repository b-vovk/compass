const { default: fetch } = require("node-fetch");
const fetchDefaults = require("fetch-defaults")

const {
  AUTH_USERNAME,
  AUTH_PASSWORD,
} = process.env;

const defaultAuthParams = {
  username: AUTH_USERNAME,
  password: AUTH_PASSWORD,
};


class Api {
  constructor(host = process.env.HOST) {
    this.host = host;
    this.access_token = null;
    this.authenticatedUser = null;
    this.fetch = fetchDefaults(fetch, {
      headers: { Authorization: null }
    })

  }

  authenticate(authParams = {}) {
     return fetch('https://www.compass.com/login/',
    { method: 'POST', body: JSON.stringify( {returnPerson:true,email:"compass9012@gmail.com",password:"Q@TakeHome0987654321"}),   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   }, })
   .then(res => res.json())
      .then(json => {
        console.log(json)
        this.access_token = json.authenticationToken;
        this.authenticatedUser = json.person;
        this.fetch = fetchDefaults(fetch, {
          headers: { Authorization: `Bearer ${this.authenticationToken}`}

        })
      });
  }
}


module.exports = Api;
