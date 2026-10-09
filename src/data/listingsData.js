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

export async function findByPropertyType(propertyType, page = 1, pageSize = 20) {
  const db = getDb();
  const skip = (page - 1) * pageSize;

  return await db
    .collection("listingsAndReviews")
    .find({ property_type: { $regex: new RegExp(`^${propertyType}$`, "i") } })
    .skip(skip)
    .limit(pageSize)
    .toArray();
}

export async function findListingsForTotalPrice(page = 1, pageSize = 20) {
  const db = getDb();
  const skip = (page - 1) * pageSize;
  return await db
    .collection("listingsAndReviews")
    .find()
    .skip(skip)
    .limit(pageSize)
    .toArray();
}

export async function findByHostId(hostId, page = 1, pageSize = 20) {
  const db = getDb();
  const skip = (page - 1) * pageSize;
  return await db
    .collection("listingsAndReviews")
    .find({ "host.host_id": hostId })
    .skip(skip)
    .limit(pageSize)
    .toArray();
}

export async function updateListingAvailability(id, availabilityData) {
  const db = getDb();
  
  const updateFields = {};
  for (const [key, value] of Object.entries(availabilityData)) {
    updateFields[`availability.${key}`] = value;
  }

  const result = await db.collection("listingsAndReviews").findOneAndUpdate(
    { _id: id },
    { $set: updateFields },
    { returnDocument: "after" }
  );

  return result;
}

export async function getTopHostsData(limit = 10) {
  const db = getDb();

  const pipeline = [
    {
      $group: {
        _id: "$host.host_id",
        host_name: { $first: "$host.host_name" },
        total_properties: { $sum: 1 }
      }
    },
    { $sort: { total_properties: -1 } },     {$limit: limit },
    {
      $project: {
        _id: 0,
        host_id: "$_id",
        host_name: 1,
        total_properties: 1
      }
    }
  ];

  return await db.collection("listingsAndReviews").aggregate(pipeline).toArray();
}