import { Express, Router, NextFunction } from 'express';
import authGuard from '../middlewares/auth-guard';
import { countActivitiesCreatorService, countActivitiesParticipantService, countActivitiesTypeService, createActivityService, getActiviesUserCreatorService, getActiviesUserParticipantService, getActivitiesService, getActivityTypesService, getParticipantsActivyService, registerUserInActivityService } from '../services/activity-service';
import activityCreation from '../types/activity/activity-creation';
import { AppError } from '../types/error/app-error';
import imageValidation from '../validations/image-validation';
import { uploadImage } from '../services/s3-service';
import upload from '../utils/multer';
import { formatAddress } from '../middlewares/format-address';

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
            const userId = request.payload?.id as string;
            const totalActivities = await countActivitiesTypeService(typeId);
            const totalPages = Math.ceil(totalActivities / parseInt(pageSize));
            const previous = parseInt(page) > 0 ? parseInt(page) - 1 : null;
            const next = parseInt(page) < totalPages - 1 ? parseInt(page) + 1 : null;

            const activities = await getActivitiesService(userId, parseInt(pageSize), parseInt(page), [typeId], { orderBy, order: orderDirection });
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
            const userId = request.payload?.id as string;

            const activities = await getActivitiesService(userId, undefined, 0, [typeId], { orderBy, order: orderDirection });
            response.status(200).json(
                activities
            );
        } catch (error) {
            next(error);
        }
    });

    router.get("/user/creator", async function (request, response, next: NextFunction) {
        try {
            const { pageSize = "10", page = "0" } = request.query as { pageSize: string, page: string };
            const userId = request.payload?.id as string;
            const totalActivities = await countActivitiesCreatorService(userId);
            const totalPages = Math.ceil(totalActivities / parseInt(pageSize));
            const previous = parseInt(page) > 0 ? parseInt(page) - 1 : null;
            const next = parseInt(page) < totalPages - 1 ? parseInt(page) + 1 : null;

            const activities = await getActiviesUserCreatorService(userId, parseInt(pageSize), parseInt(page));
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

    router.get("/user/creator/all", async function (request, response, next: NextFunction) {
        try {
            const userId = request.payload?.id as string;

            const activities = await getActiviesUserCreatorService(userId, undefined, undefined);
            response.status(200).json(
                activities
            );
        } catch (error) {
            next(error);
        }
    });

    router.get("/user/participant", async function (request, response, next: NextFunction) {
        try {
            const { pageSize = "10", page = "0" } = request.query as { pageSize: string, page: string };
            const userId = request.payload?.id as string;
            const totalActivities = await countActivitiesParticipantService(userId);
            const totalPages = Math.ceil(totalActivities / parseInt(pageSize));
            const previous = parseInt(page) > 0 ? parseInt(page) - 1 : null;
            const next = parseInt(page) < totalPages - 1 ? parseInt(page) + 1 : null;

            const activities = await getActiviesUserParticipantService(userId, parseInt(pageSize), parseInt(page));

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

    router.get("/user/participant/all", async function (request, response, next: NextFunction) {
        try {
            const userId = request.payload?.id as string;
            const activities = await getActiviesUserParticipantService(userId, undefined, undefined);
            response.status(200).json(activities);
        } catch (error) {
            next(error);
        }
    });

    router.get("/:id/participants", async function (request, response, next: NextFunction) {
        try {
            const { id } = request.params;
            const participants = await getParticipantsActivyService(id);
            response.status(200).json(participants);
        } catch (error) {
            next(error);
        }
    });

    router.post("/new", upload.single("image"), async function (request, response, next: NextFunction) {
        try {
            const userId = request.payload?.id as string;
            const fileImage = request.file;
            const result = imageValidation.safeParse(fileImage);
            if (!result.success) {
                const erro: AppError = {
                    message: result.error.errors[0].message,
                    status: 400
                }
                next(erro);
                return;
            }
            const fileUrl = await uploadImage(fileImage!, userId, "activity");

            let { title, description, typeId, address, scheduledDate, private: isPrivate } = request.body;

            const formattedAddress = formatAddress(address);

            const formattedScheduledDate = new Date(scheduledDate);
            const privateStatus = isPrivate === 'true';

            const activityCreation: activityCreation = {
                title,
                description,
                typeId,
                address: formattedAddress,
                sheduledDate: formattedScheduledDate,
                private: privateStatus,
                confirmationCode: "",
                image: fileUrl,
                createdAt: new Date(),
                creatorId: userId
            };
            const activity = await createActivityService(userId, activityCreation);

            response.status(200).json(activity);

        } catch (error) {
            next(error);
        }

    });

    router.post("/:id/subscribe", async function (request, response, next: NextFunction) {
        try {
            const id = request.params.id;
            const userId = request.payload?.id as string;
            const subscribe = await registerUserInActivityService(userId, id);
            response.status(200).json(subscribe);
        } catch (error) {
            next(error);
        }
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