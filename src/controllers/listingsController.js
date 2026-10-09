import { 
  getListings, 
  getListingById, 
  getListingsByPropertyType,
  getListingsWithTotalPrice,
  getListingsByHostId,
  updateAvailabilityService,
  getTopHostsService
} from "../services/listingsService.js";

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
    const listing = await getListingById(id);
    res.json(listing);
  } catch (error) {
    console.log("Error fetching listing: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getByPropertyType = async (req, res) => {
  try {
    const { type } = req.params;

    if (!type || type.trim() === "") {
      return res.status(400).json({ message: "El parámetro property_type es requerido" });
    }

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;

    const listings = await getListingsByPropertyType(type, page, pageSize);
    res.status(200).json(listings);
  } catch (error) {
    console.log("Error fetching listings by property type: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getWithTotalPrice = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;

    const listings = await getListingsWithTotalPrice(page, pageSize);
    res.status(200).json(listings);
  } catch (error) {
    console.log("Error fetching listings with total price: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getByHost = async (req, res) => {
  try {
    const { host_id } = req.params;

    if (!host_id || host_id.trim() === "") {
      return res.status(400).json({ message: "El parámetro host_id es requerido" });
    }

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;

    const listings = await getListingsByHostId(host_id, page, pageSize);
    res.status(200).json(listings);
  } catch (error) {
    console.log("Error fetching listings by host id: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { available_30, available_60, available_90, available_365 } = req.body;

    if (
      available_30 === undefined &&
      available_60 === undefined &&
      available_90 === undefined &&
      available_365 === undefined
    ) {
      return res.status(400).json({
        message: "Debe proveer al menos un campo de disponibilidad válido (available_30, available_60, available_90, available_365)"
      });
    }

    const availabilityData = {};
    const fields = { available_30, available_60, available_90, available_365 };

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        const parsed = Number(value);
        if (isNaN(parsed) || parsed < 0) {
          return res.status(400).json({ message: `El campo ${key} debe ser un número entero no negativo` });
        }
        availabilityData[key] = Math.trunc(parsed);
      }
    }

    const updatedListing = await updateAvailabilityService(id, availabilityData);

    if (!updatedListing) {
      return res.status(404).json({ message: `No se encontró la propiedad con ID: ${id}` });
    }

    return res.status(200).json({
      message: "Disponibilidad actualizada exitosamente",
      listing: updatedListing
    });
  } catch (error) {
    console.error("Error updating listing availability:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTopHosts = async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ message: "El parámetro limit debe ser un número entero positivo" });
    }

    const topHosts = await getTopHostsService(limit);
    return res.status(200).json(topHosts);
  } catch (error) {
    console.error("Error fetching top hosts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};