exports.handler = async (event, context) => {
  console.log(event.body)
  // console.log(event.httpMethod)
  // const user = JSON.parse(localStorage.getItem("user"))
  // console.log(user);

  // // create nfts // one time

  // // mint nft
  // // create metadata json
  // // check if dress is available
  // // create transaction

  const body = JSON.parse(event.body)
  console.log(body);

  return {
    statusCode: 200,
    body: "OKili Dokili",
  }
}
