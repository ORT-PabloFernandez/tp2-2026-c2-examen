import { getListings, getListingById, getListingByType, getListingByHost, getListWithTotalPrice } from "../services/listingsService.js";

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

export const getListingPropertyType = async (req, res) => {
    try {
        const type = req.params.type;
        const listings = await getListingByType(type);
        res.json(listings);
    } catch (error) {
        console.log("Error fetching listings by type: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingByHostId = async (req, res) => {
    try {
        const hostId = req.params.host_id;
        const listings = await getListingByHost(hostId);
        res.json(listings);
    } catch (error) {
        console.log("Error fetching listings by host ID: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getListingsWithTotalPrice = async (req, res) => {
    try {
        const listings = await getListWithTotalPrice();
        res.json(listings);
    } catch (error) {
        console.log("Error fetching listings with total price: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function getTopHost(req, res) {
    try {
        const topHost = await getTopHost();
        res.json(topHost);
    } catch (error) {
        console.log("Error fetching top host: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}