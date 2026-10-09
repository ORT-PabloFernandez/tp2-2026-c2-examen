import { findAllListings, findListingById, findListingByType, findListingByHostId, findTopHost} from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingByType = async (type) => {
    return await findListingByType(type);
}

export const getListingByHost = async (hostId) => {
    return await findListingByHostId(hostId);
}

export const getListWithTotalPrice = async() => {
    const listings = await getListings();
    return listings.map((listing) => ({
        ...listing,
        total_price: (listing.price || 0) + (listing.cleaning_fee || 0) + (listing.security_deposit || 0)
    }));
}

export async function getTopHost() {
    return await findTopHost();
}