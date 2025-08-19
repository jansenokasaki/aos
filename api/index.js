import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Bem-vindo ao Express de Jansen");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});