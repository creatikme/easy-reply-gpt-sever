import express from "express";
import chatGpt from "./chatgpt.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/responses", async (req, res) => {
  const { question } = req.query;
  const isValidSession = await chatGpt.getIsAuthenticated();
  if (!isValidSession) {
    console.log("Not Valid Session");
    await chatGpt.refreshSession();
  }
  const options = await chatGpt.sendMessage(
    `create three responses options for question:${question}`
  );
  console.log(options.response);
  const formattedResponses = options.response
    .replace(/(A|B|C)(\.|\))/g, "")
    .split("\n")
    .filter((i) => i);
  res.send({ question, options: formattedResponses });
});

console.log("Launching chatGPT server...");
chatGpt
  .initSession()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
