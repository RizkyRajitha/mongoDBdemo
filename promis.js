const request = require("request");

const getWeather = citylive => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://geocoder.api.here.com/6.2/geocode.json?app_id=lmuiUmhDK2JQwBnORnRB&app_code=W3YBbdzlsKOER9SvMF_V1g&searchtext=${citylive}`
      },
      (error, resopnse, body) => {
        if (error) {
          reject(error);
        } else if (JSON.parse(body).Response.View.length == 0) {
          reject("no place found");
        } else {
          const datain = JSON.parse(body).Response.View[0].Result[0].Location
            .DisplayPosition;
          console.log(datain.Latitude, datain.Longitude);
          resolve(
            new Promise((resolve, reject) => {
              request(
                {
                  url: `https://api.darksky.net/forecast/8f03e2f020812fb014e7541fb9a37720/${
                    datain.Latitude
                  },${datain.Longitude}`
                },
                (error, response, body2) => {
                  console.log("wetehr errr" + error + response);
                  if (error) {
                    console.log("erooooo");
                    reject(error);
                  } else {
                    const body = JSON.parse(body2);
                    //console.log(body.currently.temperature);
                    d = [
                      (body.currently.temperature - 32) * (5 / 9),
                      body.currently.summary
                    ];
                    resolve(d);
                  }
                }
              );
            })
          );
        }
      }
    );
  });
};

getWeather("ningbo chaina")
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log(`-----------------------  ${e}`);
  });

module.exports.getWeather = getWeather;
