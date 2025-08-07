const dbLayer = require("./db/dbLayer.ts");
const express = require("express");
const path = require("node:path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  messages = await dbLayer.getAllMessages();
  res.render("index", {
    messages: messages,
  });
});
app.get("/details/:message_id", async (req, res) => {
  messages = await dbLayer.getAllMessages();
  res.render("full_message", {
    // Intentionally allow the string in req.param to compare to the int ID
    message: messages.filter((it) => it.id == req.params.message_id)[0],
  });
});
app.get("/new", (req, res) => res.render("form"));
app.post("/new", async (req, res) => {
  console.log("Ready to add the new message");
  await dbLayer.addNewMessage({
    username: req.body.user,
    message: req.body.message_body,
    dateAdded: new Date(),
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
