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

export async function findByPropertyType(type, page, pageSize) {
    const db = getDb();
    const skip = (page - 1) * pageSize;
    return await db.collection("listingsAndReviews")
        .find({ property_type: type })
        .skip(skip)
        .limit(pageSize)
        .toArray();
    }

export async function findWithTotalPrice(page, pagesize) {
    const db = getDb();
    const skip = (page - 1) * pagesize;
    return await db.collection("listingsAndReviews").aggregate([
        { $skip: skip },
        { $limit: pagesize },
        { $addFields:{ $totalPrice:{ $toDouble: { $add: [
            { $ifNull: [ "$price", 0 ] },
            { $ifNull: [ "$cleaning_fee", 0 ] },
            { $ifNull: [ "$security_deposit", 0 ] },
            { $ifNull: [ "$extra_people", 0 ] }
        ]}}}}
    ]).toArray();
}

export async function findByHost(hostId, page, pageSize) {
    const db = getDb();
    const skip = (page - 1) * pageSize;
    return await db.collection("listingsAndReviews")
        .find({ "host.host_id": hostId })
        .skip(skip)
        .limit(pageSize)
        .toArray();
}
export async function updateAvailability(id, fields) {
    const db = getDb();
    const set = {};
    for (const [key, value] of Object.entries(fields)) {
        set[`availability.${key}`] = value;
    }
    return await db.collection("listingsAndReviews").updateOne(
        { _id: id },
        { $set: set }
    );
}
export async function findTopHosts(limit) {
    const db = getDb();
    return await db.collection("listingsAndReviews").aggregate([
        { $group: { _id: "$host.host_id", hostName: { $first : "$host.host_name"} ,totalListings: { $sum: 1 } } },
        { $sort: { totalListings: -1 } },
        { $limit: limit }
    ]).toArray();
}
