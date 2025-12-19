const db = require("../db/database");

// Helpers: convert DB row to API shape
function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    quantity: row.quantity,
    category: row.category,
    priority: row.priority,
    isBought: Boolean(row.is_bought),
    createdAt: row.created_at,
  };
}

function getAllItems() {
  const rows = db.prepare("SELECT * FROM grocery_items ORDER BY id DESC").all();
  return rows.map(mapRow);
}

function createItem({ name, quantity, category, priority }) {
  const stmt = db.prepare(`
    INSERT INTO grocery_items (name, quantity, category, priority)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(name, quantity ?? null, category ?? null, priority ?? "medium");
  const row = db.prepare("SELECT * FROM grocery_items WHERE id = ?").get(result.lastInsertRowid);
  return mapRow(row);
}

function updateItem(id, updates) {
  const existing = db.prepare("SELECT * FROM grocery_items WHERE id = ?").get(id);
  if (!existing) return null;

  const next = {
    name: updates.name ?? existing.name,
    quantity: updates.quantity ?? existing.quantity,
    category: updates.category ?? existing.category,
    priority: updates.priority ?? existing.priority,
    is_bought: typeof updates.isBought === "boolean" ? (updates.isBought ? 1 : 0) : existing.is_bought,
  };

  db.prepare(`
    UPDATE grocery_items
    SET name=?, quantity=?, category=?, priority=?, is_bought=?
    WHERE id=?
  `).run(next.name, next.quantity, next.category, next.priority, next.is_bought, id);

  const row = db.prepare("SELECT * FROM grocery_items WHERE id = ?").get(id);
  return mapRow(row);
}

function deleteItem(id) {
  const result = db.prepare("DELETE FROM grocery_items WHERE id = ?").run(id);
  return result.changes > 0;
}

module.exports = { getAllItems, createItem, updateItem, deleteItem };
