const express = require("express");
const path = require("node:path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    id: "0",
    text: "High: finished the CSS module",
    user: "Anora",
    added: new Date(),
  },
  {
    id: "1",
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
app.get("/details/:message_id", (req, res) =>
  res.render("full_message", {
    message: messages.filter((it) => it.id === req.params.message_id)[0],
  })
);
app.get("/new", (req, res) => res.render("form"));
app.post("/new", (req, res) => {
  console.log("Ready to add the new message");
  messages.push({
    id: crypto.randomUUID(),
    text: req.body.message_body,
    user: req.body.user,
    added: new Date(),
  });
  res.redirect("/");
});

app.use((err, req, res, next) => {
  console.error("Error was THIS: " + err);
  res.status(500).send(err);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
