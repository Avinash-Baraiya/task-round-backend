import express from "express";
import { addHop, createShipment } from "../controllers/shipment.controller.js";

const router  = express.Router();

// router.get("/path",print);
router.post("/shipment",createShipment)
router.post('/shipment/:shipment_number/hops/add',addHop)

export default router;