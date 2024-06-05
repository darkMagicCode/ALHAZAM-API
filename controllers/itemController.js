const ItemRepository = require("../repositories/itemRepository.js");

class ItemController {
  async getAll(req, res) {
    const items = await ItemRepository.findAll();
    res.json({ data: items });
  }

  async getById(req, res) {
    const item = await ItemRepository.findById(req.params.id);
    res.json(item);
  }

  async create(req, res) {
    const newItem = await ItemRepository.create(req.body);
    res.json(newItem);
  }

  async update(req, res) {
    const updatedItem = await ItemRepository.update(req.params.id, req.body);
    res.json(updatedItem);
  }

  async delete(req, res) {
    await ItemRepository.delete(req.params.id);
    res.json({ message: "Item deleted" });
  }
}

module.exports = new ItemController();
