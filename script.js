async function getAccessToken() {
  const client_id = "YOUR_CJ_API_KEY";      // Replace with your CJ API key
  const client_secret = "YOUR_CJ_API_SECRET"; // Replace with your CJ API secret

  try {
    let response = await fetch("https://developers.cjdropshipping.com/api2.0/v1/token/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: client_id,
        client_secret: client_secret
      })
    });

    let data = await response.json();
    console.log("CJ API Response:", data);

    if (data.data && data.data.access_token) {
      alert("Access Token: " + data.data.access_token);
    } else {
      alert("Failed: " + JSON.stringify(data));
    }

  } catch (err) {
    console.error("Error:", err);
  }
}

getAccessToken();
