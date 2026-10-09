import express from "express";
import { getAllListings, getListingId, getListingPropertyType, getListingByHostId, getListingsWithTotalPrice, getTopHost } from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/top-host", getTopHost);
router.get("/with-total-price", getListingsWithTotalPrice);

router.get("/:id", getListingId);
router.get("/host/:host_id", getListingByHostId);
router.get("/property-type/:type", getListingPropertyType);

export default router;
