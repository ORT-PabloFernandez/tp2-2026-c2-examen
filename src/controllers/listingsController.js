import { getListings, getListingById, getPropertyByType, getTotalOfAllProperties, getHostById, replaceProp } from "../services/listingsService.js";

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

export const getProperty = async (req, res) => {
    try {
        const type = req.params.type;
        console.log(type);
        const list = await getPropertyByType(type);
        if(!list || list.length === 0){
            return res.status(404).json({message: "Tipo de alojamiento no encontrado"});
        }
        res.json(list);
    } catch (error) {
        console.error("Error fetching types: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getTotal = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const list = await getTotalOfAllProperties(page, pageSize);

        res.json(list);
    } catch (error) {
        console.error("Error fetching totals: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};



export const getHost = async (req, res) => {
    try {
        const id = req.params.host_id;
        console.log(id);

        const hosts = await getHostById(id);
        if(!hosts){
            return res.status(404).json({message: "Host ID no encontrado"});
        }

        res.json(hosts);
    } catch (error) {
        console.error("Error fetching hosts: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await replaceProp(id, req.body);
        res.status(200).json({ message: "Propiedad actualizada", data: property });
    } catch (error) {
        console.error("Error updating data: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};