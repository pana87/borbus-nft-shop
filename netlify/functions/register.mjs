export const handler = async (event, context) => {
  if (!event.body) {
    return {
      statusCode: 405,
      // body: `${JSON.stringify(event)}`,
      body: `${JSON.stringify(context)}`,
    }
  }

  // console.log(event);
  // console.log(context);
  // console.log(JSON.parse(event.body))

  const user = JSON.parse(event.body)
  console.log(user);

  // console.log(user.addresses[0].name);


  return {
    statusCode: 200,
    body: "OK"
  }
}
