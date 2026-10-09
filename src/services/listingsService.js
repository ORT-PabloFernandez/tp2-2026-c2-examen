import { findAllListings, findListingById, findPropertyByType, findTotalOfProperties, findHostById, updateProperty } from "../data/listingsData.js";

function validatePropertyData(data) {
    const { available_30, available_60, available_90, available_365 } = data;

    if (typeof available_30 !== "number" || Number.isNaN(available_30) || available_30 <= 0) {
        throw createHttpError(400, "El campo 'available_30' debe ser numérico y mayor a 0");
    }
    if (typeof available_60 !== "number" || Number.isNaN(available_60) || available_60 <= 0) {
        throw createHttpError(400, "El campo 'available_60' debe ser numérico y mayor a 0");
    }
    if (typeof available_90 !== "number" || Number.isNaN(available_90) || available_90 <= 0) {
        throw createHttpError(400, "El campo 'available_90' debe ser numérico y mayor a 0");
    }
    if (typeof available_365 !== "number" || Number.isNaN(available_365) || available_365 <= 0) {
        throw createHttpError(400, "El campo 'available_365' debe ser numérico y mayor a 0");
    }
}

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getPropertyByType = async (type) => {
    return await findPropertyByType(type);
}

export const getTotalOfAllProperties = async (page, pageSize) => {
    return await findTotalOfProperties(page, pageSize);
}

export const getHostById = async (id) => {
    return await findHostById(id);
}


export const replaceProp = async (id, data) => {
    validatePropertyData(data);
    const { available_30, available_60, available_90, available_365 } = data;
    const updated = await updateProperty(id, { "available.available_30": available_30, "available.available_60": available_60, "available.available_90": available_90, "available.available_365": available_365 });
    if (!updated) {
        throw createHttpError(404, "Producto no encontrado");
    }
    return updated;
}