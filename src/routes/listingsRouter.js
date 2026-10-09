import express from "express";
import { getAllListings, getListingId, getProperty, getTotal, getHost} from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/property-type/:type", authMiddleware, getProperty);
router.get("/with-total-price", authMiddleware, getTotal);
router.get("/host/:host_id", authMiddleware, getHost);

router.get("/:id", getListingId);


//> 1. Desarrollar el endpoint para obtener propiedades por tipo de alojamiento
//Crear un endpoint que permita filtrar las propiedades por tipo de alojamiento (property_type) utilizando 
//el formato /api/listings/property-type/:type. Este endpoint debe retornar todas las propiedades que coincidan con el 
// tipo especificado (ej: "Apartment", "House", "Condominium").

export default router;
