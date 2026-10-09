import { findAllListings, findListingById, findByPropertyType,findWithTotalPrice, findByHost, updateAvailability, findTopHosts } from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}
export const getByPropertyType = async (type, page, pageSize) => {
    return await findByPropertyType(type, page, pageSize);
}

export const getWithTotalPrice = async (page, pageSize) => {
    return await findWithTotalPrice(page, pageSize);
}

export const getByHost = async (hostId, page, pageSize) => {
    return await findByHost(hostId, page, pageSize);
}

export const updateListingAvailability = async (id, fields) => {
    return await updateAvailability(id, fields);
}

export const getTopHosts = async (limit) => {
    return await findTopHosts(limit);
}
