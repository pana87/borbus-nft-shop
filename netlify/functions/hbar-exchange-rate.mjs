const https = require("node:https")

function request(options) {
  return new Promise((resolve, reject) => {
    const request = https.request(options, response => {
      response.on("data", data => resolve(JSON.parse(data.toString())))
    })
    request.on("error", (error) => reject(error))
    request.end()
  })
}

export const handler = async (event, context) => {

  const options1 = {
    hostname: "api.bittrex.com",
    port: 443,
    path: "/v3/markets/hbar-usd/ticker",
    method: "GET",
  }
  const response1 = await request(options1)

  const options2 = {
    hostname: "api.bittrex.com",
    port: 443,
    path: "/v3/markets/usd-eur/ticker",
    method: "GET",
  }
  const response2 = await request(options2)

  return {
    statusCode: 200,
    body: JSON.stringify({
      USD_EUR: response2.lastTradeRate,
      HBAR_USD: response1.lastTradeRate,
    }),
  }
}
