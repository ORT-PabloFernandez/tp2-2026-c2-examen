import { getDb } from "./connection.js";

export async function findAllListings(page, pageSize) {
    const db = getDb();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const listings = await db.collection("listingsAndReviews")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return listings;
    } else {
        // Sin paginación: trae todos los documentos
        const listings = await db.collection("listingsAndReviews").find().toArray();
        return listings;
    }
}

export async function findListingById(id) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews").findOne({ _id: id });
    console.log(listing);
    return listing;
}

export async function findListingByType(type) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews")
        .find({ property_type: type })
        .toArray();
    return listing;
}

export async function findListingByHostId(hostId) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews")
        .find({ "host.host_id": hostId })
        .toArray();
    return listing;
}


export async function findTopHost(){
    const db = getDb();
    const topHost = await db.collection("listingsAndReviews")
        .find({})
        .sort({ "host.host_id": -1 })
        .limit(10)
        .toArray();
    return topHost;
}