import { getListings, getListingById, getPropertyByType, getTotalOfAllProperties, getHostById } from "../services/listingsService.js";

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

/*> 2. Desarrollar el endpoint para obtener todas las propiedades con precio total calculado
Crear un endpoint /api/listings/with-total-price que retorne todas las propiedades con una nueva propiedad llamada **totalPrice** 
que sume el precio base (price) más las tarifas adicionales como cleaning_fee, security_deposit y extra_people si existen. 
Si alguna tarifa no está disponible, debe considerarse como 0.*/ 

export const getTotal = async (req, res) => {
    try {
        const list = await getTotalOfAllProperties();

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