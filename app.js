const express = require("express");
const path = require("node:path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const messages = [
  {
    text: "High: finished the CSS module",
    user: "Anora",
    added: new Date(),
  },
  {
    text: "Low: got stuck trying to install Postman",
    user: "Thara",
    added: new Date(),
  },
];

app.get("/", (req, res) =>
  res.render("index", {
    messages: messages,
  })
);
app.get("/new", (req, res) => res.send("New post form"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
