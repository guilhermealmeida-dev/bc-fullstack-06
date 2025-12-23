import { Express, Router, NextFunction } from 'express';
import authGuard from '../middlewares/auth-guard';
import { countActivitiesCreatorService, countActivitiesParticipantService, countActivitiesTypeService, createActivityService, getActiviesUserCreatorService, getActiviesUserParticipantService, getActivitiesAllFilterTypeOrderByService, getActivitiesPaginatedFilterOrderByService, getActivityTypesService, getParticipantsActivyService, registerUserInActivityService } from '../services/activity-service';
import activityCreation from '../types/activity/activity-creation';
import { AppError } from '../types/error/app-error';
import imageValidation from '../validations/image-validation';
import { uploadImage } from '../services/s3-service';
import upload from '../utils/multer';
import { formatAddress } from '../middlewares/format-address';
import { getUserPreferencesService } from '../services/user-service';

export function activityController(server: Express) {
    const router = Router();
    router.use(authGuard);

    router.get("/types", async function (request, response, next: NextFunction) {
        try {
            const activitiesTypes = await getActivityTypesService();
            response.status(200).send(activitiesTypes);
            return;
        } catch (error) {
            return next(error);
        }
    });

    router.get("/", async function (request, response, next: NextFunction) {
        try {
            const userId = request.payload?.id as string;

            const {
                pageSize = "10",
                page = "0",
                typeId,
                orderBy = "title",
                order = "asc"
            } = request.query as {
                pageSize: string,
                page: string,
                typeId?: string,
                orderBy: string,
                order: "asc" | "desc"
            };

            const preferences = (await getUserPreferencesService(userId)).map(p => p.typeId);

            const typeIds = typeId ? [typeId] : [];

            const parsedPage = Number.parseInt(page);
            const parsedPageSize = Number.parseInt(pageSize);

            let filterIds: string[] | null = null;

            if (typeIds?.length > 0) {
                filterIds = typeIds;
            }

            const totalActivities = await countActivitiesTypeService(filterIds);

            const totalPages = Math.ceil(totalActivities / parsedPageSize);

            const previous = parsedPage > 0 ? parsedPage - 1 : null;
            const next = parsedPage < totalPages - 1 ? parsedPage + 1 : null;

            const activities = await getActivitiesPaginatedFilterOrderByService(
                userId,
                parsedPageSize,
                parsedPage,
                typeIds,
                preferences.length > 0 ? preferences : null,
                { orderBy, order }
            );

            response.status(200).json({
                page: parsedPage,
                pageSize: parsedPageSize,
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
            const {
                typeId,
                orderBy,
                order = "asc"
            } = request.query as {
                typeId: string,
                orderBy: string,
                order: "asc" | "desc"
            };
            const userId = request.payload?.id as string;

            const activities = await getActivitiesAllFilterTypeOrderByService(userId, typeId, { orderBy, order });

            response.status(200).json(activities);

        } catch (error) {
            next(error);
        }
    });

    router.get("/user/creator", async function (request, response, next: NextFunction) {
        try {
            const pageNumber = Math.max(0, Number(request.query.page) || 0);
            const pageSizeNumber = Math.max(1, Number(request.query.pageSize) || 10);


            const userId = request.payload?.id as string;
            const totalActivities = await countActivitiesCreatorService(userId);
            const totalPages = Math.ceil(totalActivities / pageSizeNumber);
            const previous = pageNumber > 0 ? pageNumber - 1 : null;
            const next = pageNumber < totalPages - 1 ? pageNumber + 1 : null;

            const activities = await getActiviesUserCreatorService(userId, pageSizeNumber, pageNumber);
            response.status(200).json({
                page: pageNumber,
                pageSize: pageSizeNumber,
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

            const activities = await getActiviesUserCreatorService(userId, 0, 0);
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
            const totalPages = Math.ceil(totalActivities / Number.parseInt(pageSize));
            const previous = Number.parseInt(page) > 0 ? Number.parseInt(page) - 1 : null;
            const next = Number.parseInt(page) < totalPages - 1 ? Number.parseInt(page) + 1 : null;

            const activities = await getActiviesUserParticipantService(userId, Number.parseInt(pageSize), Number.parseInt(page));

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
                image: fileUrl.url,
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