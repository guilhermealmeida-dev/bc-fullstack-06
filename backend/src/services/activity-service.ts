import { countActivities, getActivitiesFilterOrderBy, getActivitiesPaginatedFilterOrderBy } from "../repository/activity-repository";
import { getActivityTypes } from "../repository/activity-type-repository";
import { getUserPreferencesTypeIds } from "../repository/preference-repository";

export async function getActivityTypesService() {
    try {
        return await getActivityTypes();
    } catch (error) {
        throw error;
    }
}

export async function countActivitiesService(typeId: string | undefined) {
    try {
        return await countActivities(typeId);
    } catch (error) {
        throw error;
    }
}

export async function getActivitiesPaginatedFilterOrderByService(userId: string, pageSize: number, page: number, typeIds: string[], orderByData: { orderBy: string; order: "asc" | "desc" } | undefined) {
    try {
        console.log(typeIds)
        if ((typeIds.length === 1 && typeIds[0] === undefined)) {
            typeIds = await getUserPreferencesTypeIds(userId);
        }
        console.log(typeIds)
        return await getActivitiesPaginatedFilterOrderBy(userId, pageSize, page, typeIds, orderByData);
    } catch (error) {
        throw error;
    }
}

export async function getActivitiesFilterOrderByServiceAll(userId: string, typeIds: string | undefined, orderByData: { orderBy: string; order: "asc" | "desc" } | undefined) {
    try {

        return await getActivitiesFilterOrderBy(userId, typeIds, orderByData);
    } catch (error) {
        throw error;
    }
} 