import { 
  findAllListings, 
  findListingById, 
  findByPropertyType, 
  findListingsForTotalPrice, 
  findByHostId, 
  updateListingAvailability,
  getTopHostsData 
} from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
  return await findAllListings(page, pageSize);
};

export const getListingById = async (id) => {
  return await findListingById(id);
};

export async function getListingsByPropertyType(propertyType, page, pageSize) {
  return await findByPropertyType(propertyType, page, pageSize);
}

export async function getListingsWithTotalPrice(page, pageSize) {
  const listings = await findListingsForTotalPrice(page, pageSize);

  return listings.map((item) => {
    const price = Number(item.price?.$numberDecimal || item.price || 0);
    const cleaningFee = Number(item.cleaning_fee?.$numberDecimal || item.cleaning_fee || 0);
    const securityDeposit = Number(item.security_deposit?.$numberDecimal || item.security_deposit || 0);
    const extraPeople = Number(item.extra_people?.$numberDecimal || item.extra_people || 0);

    const totalPrice = price + cleaningFee + securityDeposit + extraPeople;

    return {
      ...item,
      totalPrice
    };
  });
}

export async function getListingsByHostId(hostId, page, pageSize) {
  return await findByHostId(hostId, page, pageSize);
}

export async function updateAvailabilityService(id, availability) {
  return await updateListingAvailability(id, availability);
}

export async function getTopHostsService(limit) {
  return await getTopHostsData(limit);
}