import express from "express";
import AuthRoute from "./AuthRoute.js";
import {
  createItem,
  getItems,
  logConsumption,
  getRestockAlerts
} from '../Controllers/inventoryController.js';



const router = express.Router();

router.use("/auth", AuthRoute);

router.post('/items', createItem);
router.get('/items', getItems);
router.post('/consumption', logConsumption);
router.get('/restock-alerts', getRestockAlerts);



export default router;



