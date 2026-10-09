import express from "express";
import { 
  getAllListings, 
  getListingId, 
  getByPropertyType,
  getWithTotalPrice,
  getByHost,
  updateAvailability,
  getTopHosts
} from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/top-hosts", authMiddleware, getTopHosts);
router.get("/with-total-price", authMiddleware, getWithTotalPrice);
router.get("/property-type/:type", authMiddleware, getByPropertyType);
router.get("/host/:host_id", authMiddleware, getByHost);
router.patch("/:id/availability", authMiddleware, updateAvailability);
router.put("/:id/availability", authMiddleware, updateAvailability);
router.get("/", authMiddleware, getAllListings);
router.get("/:id", authMiddleware, getListingId);

export default router;