import { Request, Response, NextFunction } from "express";
import activityAddresse from "../types/activity/activity-addresse";

export function formatAddress(address: string): activityAddresse {
    if (typeof address === 'string') {
        const coordinates = address.split(",").map(coord => coord.trim());

        if (coordinates.length === 2) {
            const latitude = parseFloat(coordinates[0]);
            const longitude = parseFloat(coordinates[1]);

            if (isNaN(latitude) || isNaN(longitude)) {
                throw { status: 500 };
            }
            const address: activityAddresse = {
                activityId: "",
                latitude: isNaN(latitude) ? 0 : latitude,
                longitude: isNaN(longitude) ? 0 : longitude
            }
            return address;
        } else {
            throw { status: 500 };
        }
    }

    return address;
}
