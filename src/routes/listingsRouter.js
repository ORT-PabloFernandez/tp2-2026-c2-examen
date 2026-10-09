import express from "express";
import { getAllListings, getListingId, getProperty, getTotal, getHost, updateProperty} from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/property-type/:type", authMiddleware, getProperty);
router.get("/with-total-price", authMiddleware, getTotal);
router.get("/host/:host_id", authMiddleware, getHost);
router.put("/:id", authMiddleware, updateProperty);
router.get("/:id", getListingId);


export default router;
