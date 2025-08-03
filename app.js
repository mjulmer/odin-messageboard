import express from "express";
const app = express();

app.get("/", (req, res) => res.send("Home page"));
app.get("/new", (req, res) => res.send("New post form"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
