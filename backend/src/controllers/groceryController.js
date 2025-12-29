const { inferCategory } = require("../utils/category");
const groceryModel = require("../models/groceryModel");

function getItems(req, res) {
  const items = groceryModel.getAllItems();
  res.status(200).json(items);
}

function createItem(req, res) {
  const { name, quantity, priority } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Item name is required." });
  }

  const category = inferCategory(name);
  const item = groceryModel.createItem({
    name: name.trim(),
    quantity: quantity ?? "",
    category,
    priority: priority ?? "medium",
  });

  res.status(201).json(item);
}

function updateItem(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id." });

  const updated = groceryModel.updateItem(id, req.body);
  if (!updated) return res.status(404).json({ error: "Item not found." });

  res.status(200).json(updated);
}

function deleteItem(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id." });

  const ok = groceryModel.deleteItem(id);
  if (!ok) return res.status(404).json({ error: "Item not found." });

  res.status(204).send();
}

module.exports = { getItems, createItem, updateItem, deleteItem };
