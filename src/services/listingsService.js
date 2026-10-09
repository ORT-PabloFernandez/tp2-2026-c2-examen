import { findAllListings, findListingById, findPropertyByType, findTotalOfProperties, findHostById } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getPropertyByType = async (type) => {
    return await findPropertyByType(type);
}

export const getTotalOfAllProperties = async () => {
    return await findTotalOfProperties();
}

export const getHostById = async (id) => {
    return await findHostById(id);
}