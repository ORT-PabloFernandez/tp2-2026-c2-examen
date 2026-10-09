import { getListings, getListingById, getByHost, getByPropertyType, getWithTotalPrice, getTopHosts, updateAvailabilityService } from "../services/listingsService.js";

export const getAllListings = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const listings = await getListings(page, pageSize);
        res.json(listings);
    } catch (error) {
        console.log("Error fetching listings: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingId = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const listing = await getListingById(id);
        res.json(listing);
    } catch (error) {
        console.log("Error fetching listing: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

function parsePagination(query) {
    const page = query.page ? parseInt(query.page) : 1;
    const pageSize = query.pageSize ? parseInt(query.pageSize) : 20;
    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
    return null;
}
return { page, pageSize };
}

export const getListingsByPropertyType = async (req, res) => {
    try {
        const pagination = parsePagination(req.query);
        if (!pagination) {
            return res.status(400).json({ message: " Tiene que ser un numero mayor a 0 " });
        }
        const listings = await getByPropertyType(req.params.type, pagination.page, pagination.pageSize);
        res.json(listings);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getListingsWithTotalPrice = async (req, res) => {
    try {
        const pagination = parsePagination(req.query);
        if (!pagination) {
            return res.status(400).json({ message: " Tiene que ser un numero mayor a 0 " });
        }
        const listings = await getWithTotalPrice(pagination.page, pagination.pageSize);
        res.json(listings);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getListingsByHost = async (req, res) => {
    try {
        const pagination = parsePagination(req.query);
        if (!pagination) {
            return res.status(400).json({ message: " Tiene que ser un numero mayor a 0 " });
        }
        const listings = await getByHost(req.params.hostId, pagination.page, pagination.pageSize);
        res.json(listings);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const ALLOWED_AVAILABILITY = ["available_30", "unavailable_60", "unavailable_90", "unavailable_365"];
export const patchAvailability = async (req, res) => {
    try {
        const fields = req.body || {};
        const keys = Object.keys(fields);
        if (keys.length === 0) {
            return res.status(400).json({ message: "Debe haber campos para actualizar" });
        }
        for (const key of keys) {
            if (!ALLOWED_AVAILABILITY.includes(key)) {
                return res.status(400).json({ message: `Campo no permitido: ${key}` });
            }
            if (!Number.isInteger(fields[key]) || fields[key] < 0) {
                return res.status(400).json({ message: `Valor no permitido para ${key}: ${fields[key]}` });
            }
        }
        const result = await updateAvailabilityService(req.params.id, fields);
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "No se encontró el listing o no hubo cambios" });
        }
        res.json({ message: "Disponibilidad actualizada correctamente" });
    }catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }};

    export const getTopHostsController = async (req, res) => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            if (isNaN(limit) || limit < 1) {
                return res.status(400).json({ message: "El limite debe ser un número mayor a 0" });
            }
            const topHosts = await getTopHosts(limit);
            res.json(topHosts);
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ message: "Internal server error" });
        }};


