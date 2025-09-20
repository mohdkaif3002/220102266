const Log = async (stack, level, pkg, message) => {
  const API_URL = "http://20.244.56.144/evaluation-service/logs";
  const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNTc0MzQOLCJpYXQiOjE3NDM1NzQwNDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ5Y2JiNjk5LTZhMjctNDRhNS04ZDU5LThiMWJlZmE4MTZkYSIsInN1YiI6InJhbWtyaXNobmFAYWJjLmVkdSJ9LCJ1bWFpbCI6InJJhbWtyaXNobmFAYWJjLmVkdSIsIm5hbWUiOiJyYW0ga3Jpc2huYSIsInJvbGxObyI6ImFhMWJiIiwiYWNjZXNzQ29kZSI6InhnQXNOQyIsImNsaWVudElEIjoiZDljYmI2OTktNmEyNy00NGE1LThkNTKtOGIxZmVmYTgxNmRhIiwiY2xpZW50U2VjcmV0IjoidFZKYWFhUkJTZVhjUlh1TSJ9.YApD98gq0IN_OWw7JMfmuUfK1m4hLTm7AICLDCLAzVg";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Log created:", result.logID);
    } else {
      console.error("Failed to send log:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending log:", error);
  }
};

export default Log;