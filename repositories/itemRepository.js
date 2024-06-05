const Item = require('../models/Item.js');

class ItemRepository {
    async findAll() {
        return await Item.find();
    }

    async findById(id) {
        return await Item.findById(id);
    }

    async create(item) {
        return await Item.create(item);
    }

    async update(id, item) {
        return await Item.findByIdAndUpdate(id, item, { new: true });
    }

    async delete(id) {
        return await Item.findByIdAndDelete(id);
    }
}

module.exports = new ItemRepository();
