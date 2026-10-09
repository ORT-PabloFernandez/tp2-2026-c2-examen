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

export async function findPropertyByType(type) {
    const db = getDb();
    const ptype = { property_type: { $regex: type, $options: "i" } };
    const properties = await db.collection("listingsAndReviews")
                .find(ptype)
                .toArray();

    return properties;
}



export async function findTotalOfProperties() {
    const db = getDb();
    
    const properties = await db.collection("listingsAndReviews")
                        .find()
                        .toArray();

    const priceProperties = properties
        .map(
        prop => {
            const price = prop.price || 0;
            const cleaning_fee = prop.cleaning_fee || 0;
            const security_deposit = prop.security_deposit || 0;
            const extra_people = prop.extra_people || 0;
            return ({
                ...prop,
                totalPrice: parseFloat(price) + parseFloat(cleaning_fee) + parseFloat(security_deposit) + parseFloat(extra_people)
            })
        } 
    );

    return priceProperties;
}



export async function findHostById(id) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews").findOne({ "host.host_id": id })
    return listing;
}