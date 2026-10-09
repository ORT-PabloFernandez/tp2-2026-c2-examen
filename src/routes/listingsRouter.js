import express from "express";
import { getAllListings, getListingId, getListingsByPropertyType, getListingsWithTotalPrice, getTopHostsController, getListingsByHost
 } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/:id", getListingId);
router.get("/property-type/:type", getListingsByPropertyType);
router.get("/total-price", getListingsWithTotalPrice);
router.get("/top-hosts", getTopHostsController);
router.get("/host/:hostId", getListingsByHost);

export default router;
