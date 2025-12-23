import { Express, Router, NextFunction } from "express";
import { defineUserPreferences, desactiveUserAcaunt, getUser, getUserPreferencesService, updateUser } from "../services/user-service";
import authGuard from "../middlewares/auth-guard";
import { requestBodyValidator } from "../middlewares/request-body-validator";
import updateUserValidation from "../validations/update-user-validation";
import upload from "../utils/multer";
import { uploadImage } from "../services/s3-service";
import imageValidation from "../validations/image-validation";
import { createError } from "../utils/create-error";

function userController(server: Express) {
    const router = Router();
    router.use(authGuard);

    router.get(
        "/",
        async (request, response, next: NextFunction) => {
            try {
                const userId = request.payload?.id as string;
                const user = await getUser(userId);
                response.status(200).json(user);
                return;
            } catch (error) {
                return next(error);
            }
        }
    );

    router.get(
        "/preferences",
        async (request, response, next: NextFunction) => {
            try {
                const userId = request.payload?.id as string;
                const preferences = await getUserPreferencesService(userId);
                response.status(200).send(preferences);
                return;
            } catch (error) {
                return next(error);
            }
        }
    );

    router.post(
        "/preferences/define",
        async (request, response, next: NextFunction) => {

            const userId = request.payload?.id as string;
            const preferences = request.body as string[];

            try {
                await defineUserPreferences(preferences, userId);
                response.status(200).json({ message: "Preferências atualizadas com sucesso." });
                return;
            } catch (error) {
                return next(error)
            }
        }
    );

    router.put(
        "/avatar",
        upload.single("avatar"),
        async (request, response, next: NextFunction) => {
            try {
                const userId = request.payload?.id as string;
                const fileImage = request.file;
                const result = imageValidation.safeParse(fileImage);

                if (!result.success) {
                    const error = createError(result.error.errors[0].message, 400);
                    return next(error);
                }

                const fileUrl = await uploadImage(fileImage!, userId, "profile");
                await updateUser({ avatar: fileUrl.url }, userId);

                response.status(200).json({ avatar: fileUrl.url });
                return;
            } catch (error) {
                return next(error);
            }
        }
    );

    router.put(
        "/update",
        requestBodyValidator(updateUserValidation),
        async (request, response, next: NextFunction) => {
            try {
                const userId = request.payload?.id as string;
                const userDataUpdate = request.body;
                const user = await updateUser(userDataUpdate, userId);
                response.status(200).json(user);
            } catch (error) {
                return next(error);
            }
        });

    router.delete(
        "/deactivate/",
        async (request, response, next: NextFunction) => {
            try {
                const userId = request.payload?.id as string;
                await desactiveUserAcaunt(userId);
                response.status(200).json({ message: "Conta desativada com sucesso" })
            } catch (error) {
                return next(error)
            }
        });

    server.use("/user", router);
}
export default userController;
