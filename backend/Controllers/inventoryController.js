import Item from '../models/ItemModel.js';
import Consumption from '../models/ConsumptionLogModel.js';


export const createItem = async (req, res) => {
  try {
    const { name, unit, currentQuantity, reorderThreshold } = req.body;
    const item = new Item({ name, unit, currentQuantity, reorderThreshold });
    await item.save();
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    const itemsWithStatus = items.map(item => {
      let status = item.currentQuantity <= item.reorderThreshold ? 'LOW' : 'OK';
      return { ...item.toObject(), status };
    });
    res.status(200).json({ success: true, items: itemsWithStatus });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const logConsumption = async (req, res) => {
  try {
    const { itemId, quantity, date } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    if (item.currentQuantity < quantity)
      return res.status(400).json({ success: false, message: "Not enough stock" });

    const consumption = new Consumption({
      item: itemId,
      quantity,
      date: date || new Date(),
    });
    await consumption.save();

    item.currentQuantity -= quantity;
    await item.save();

    res.status(201).json({ success: true, consumption });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getRestockAlerts = async (req, res) => {
  try {
    const items = await Item.find();
    const alerts = [];

    for (const item of items) {
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      const consumptions = await Consumption.find({
        item: item._id,
        date: { $gte: last7Days },
      });

      const totalConsumed = consumptions.reduce((acc, c) => acc + c.quantity, 0);
      const avgDailyConsumption = totalConsumed / 7;

      if (avgDailyConsumption === 0) continue;

      const estimatedDaysLeft = item.currentQuantity / avgDailyConsumption;

      if (estimatedDaysLeft <= 5) {
        alerts.push({
          itemId: item._id,
          itemName: item.name,
          currentQuantity: item.currentQuantity,
          estimatedDaysLeft: Math.round(estimatedDaysLeft),
        });
      }
    }

    res.status(200).json({ success: true, alerts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
