import express from "express";
import { getCustomers,getTransactions, getGeography } from "../controllers/client.js"

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography",getGeography)

export default router;