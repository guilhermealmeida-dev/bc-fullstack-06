import { Express, Router, NextFunction } from 'express';
import authGuard from '../middleware/auth-guard';
import { countActivitiesService, getActivitiesFilterOrderByServiceAll, getActivitiesPaginatedFilterOrderByService, getActivityTypesService } from '../services/activity-service';

export function activityController(server: Express) {
    const router = Router();
    router.use(authGuard);

    router.get("/types", async function (request, response, next: NextFunction) {
        try {
            const activitiesTypes = await getActivityTypesService();
            response.status(200).send(activitiesTypes);
        } catch (error) {
            next(error);
        }
    });

    router.get("/", async function (request, response, next: NextFunction) {
        try {

            const { pageSize = "10", page = "0", typeId, orderBy = "title", order = "asc" } = request.query as { pageSize: string, page: string, typeId: string, orderBy: string, order: string };
            const orderDirection: "asc" | "desc" = order === "asc" ? "asc" : "desc";
            const userId = request.userId as string;
            const totalActivities = await countActivitiesService(typeId);
            const totalPages = Math.ceil(totalActivities / parseInt(pageSize));
            const previous = parseInt(page) > 0 ? parseInt(page) - 1 : null;
            const next = parseInt(page) < totalPages - 1 ? parseInt(page) + 1 : null;

            const activities = await getActivitiesPaginatedFilterOrderByService(userId, parseInt(pageSize), parseInt(page), [typeId], { orderBy, order: orderDirection });
            response.status(200).json({
                page,
                pageSize,
                totalActivities,
                totalPages,
                previous,
                next,
                activities
            });
        } catch (error) {
            next(error);
        }
    });

    router.get("/all", async function (request, response, next: NextFunction) {
        try {

            const { typeId, orderBy = "title", order = "asc" } = request.query as { typeId: string, orderBy: string, order: string };
            const orderDirection: "asc" | "desc" = order === "asc" ? "asc" : "desc";
            const userId = request.userId as string;

            const activities = await getActivitiesFilterOrderByServiceAll(userId, typeId, { orderBy, order: orderDirection });
            response.status(200).json(
                activities
            );
        } catch (error) {
            next(error);
        }
    });

    router.get("/user/creator", function (request, response, next: NextFunction) {

    });

    router.get("/user/creator/all", function (request, response, next: NextFunction) {

    });


    router.get("/user/participant", function (request, response, next: NextFunction) {

    });

    router.get("/user/participant/all", function (request, response, next: NextFunction) {

    });

    router.get("/{id}/participants", function (request, response, next: NextFunction) {

    });

    router.post("/new", function (request, response, next: NextFunction) {

    });

    router.post("/{id}/subscribe", function (request, response, next: NextFunction) {

    });

    router.put("/{id}/update", function (request, response, next: NextFunction) {

    });

    router.put("/{id}/conclude", function (request, response, next: NextFunction) {

    });

    router.put("/{id}/appprove", function (request, response, next: NextFunction) {

    });

    router.put("/{id}/check-in", function (request, response, next: NextFunction) {

    });

    router.put("/{id}/unsubscribe", function (request, response, next: NextFunction) {

    });

    router.put("/{id}/delete", function (request, response, next: NextFunction) {

    });

    server.use("/activities", router);
}