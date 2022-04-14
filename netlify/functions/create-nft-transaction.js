
exports.handler = async (event, context) => {

  // const body = JSON.parse(event.body)
  console.log(context);
  console.log(event);
  console.log(event.queryStringParameters);

  if (event.httpMethod === "POST") {
    console.log("is post request");
    if (event.queryStringParameters.secret) {
      console.log("secret exists");
      if (event.queryStringParameters.secret === "passwort") {
        console.log("secret exists and passwort korrekt");
      }
    }
  }


  return {
    statusCode: 200,
    body: "OK"
  }
}
