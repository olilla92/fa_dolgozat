import express from "express";
import tree from "./data/tree.js";

const app = express();
app.use(express.json());

app.get("/tree", (req, res) => {
  res.status(200).json(tree);
});

app.get("/tree/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= tree.length) {
    return res.status(404).json({ message: "The tree can't be found!" });
  }
  res.status(200).json(tree[id]);
});

app.post("/tree", (req, res) => {
  const { name, category, price, isEvergreen } = req.body;
  if (!name || !category || !price || !isEvergreen) {
    return res.status(400).json({ message: "Missing data!" });
  }
  const newtree = { name, category, price, isEvergreen };
  tree.push(newtree);
  res.status(201).json(newtree);
});

app.put("/tree/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= tree.length) {
    return res.status(404).json({ message: "The tree can't be found!" });
  }
  const { name, category, price, isEvergreen } = req.body;
  if (!name || !category || !price || !isEvergreen) {
    return res.status(400).json({ message: "Missing data!" });
  }
  tree[id] = { name, category, price, isEvergreen };
  res.status(200).json(tree[id]);
});

app.delete("/tree/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= tree.length) {
    return res.status(404).json({ message: "The tree can't be found!" });
  }
  tree.splice(id, 1);
  res.status(200).json({ message: "The deletion was successful!" });
});

app.listen(3010, () => {
  console.log("The server runs successfully!");
});
