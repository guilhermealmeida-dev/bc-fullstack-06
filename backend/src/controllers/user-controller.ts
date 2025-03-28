import { Express, Router, NextFunction } from "express";
import { defineUserPreferences, desactiveUserAcaunt, getUser, getUserPreferences, updateUser } from "../services/user-service";
import authGuard from "../middleware/auth-guard";
import requestBodyValidator from "../middleware/request-body-validator";
import updateUserValidation from "../validations/update-user-validation";
import upload from "../multer/multer";
import { uploadImage } from "../services/s3-service";
import { uploadProfile } from "../repository/user-repository";
import imageValidation from "../validations/image-validation";
import { ErrorRequest } from "../types/error/error-request";
function userController(server: Express) {
    const router = Router();
    router.use(authGuard);

    router.get("/", async (request, response, next: NextFunction) => {
        try {
            const userId = request.userId as string;
            const user = await getUser(userId);
            response.status(200).json(user);
        } catch (error) {
            next(error);
        }
    });

    router.get("/preferences", async (request, response,next:NextFunction) => {
        try {
            const userId = request.userId as string;
            const preferences = await getUserPreferences(userId);
            response.status(200).send(preferences);
        } catch (error) {
            next(error);
        }
    });

    router.post("/preferences/define", async (request, response, next: NextFunction) => {
        const userId = request.userId as string;
        const preferences = request.body;
        try {
            const isInValid=await defineUserPreferences(preferences, userId);
            console.log(isInValid);
            if(isInValid){
                const erro: ErrorRequest = {
                    message: "Um ou mais IDs são inválidos",
                    status: 400
                }
                next(erro);
                return;
            }
            response.status(200).json({ message: "Preferências atualizadas com sucesso" });
        } catch (error) {
            next(error)
        }
    });

    router.put("/avatar", upload.single("avatar"), async (request, response, next: NextFunction) => {
        try {
            const userId = request.userId as string;
            const fileImage = request.file;
            const result = imageValidation.safeParse(fileImage);
            if (!result.success) {
                const erro: ErrorRequest = {
                    message: result.error.errors[0].message,
                    status: 400
                }
                next(erro);
                return;
            }
            const fileUrl = await uploadImage(fileImage!, userId, "profile");
            await uploadProfile(fileUrl, userId);
            response.status(200).json({ avatar: fileUrl });
        } catch (error) {
            next(error);
        }

    });

    router.put("/update/", requestBodyValidator(updateUserValidation), async (request, response, next: NextFunction) => {
        try {
            const userId = request.userId as string;
            const userDataUpdate = request.body;
            const user = await updateUser(userDataUpdate, userId);
            response.status(200).json(user);
        } catch (error) {
            next(error);
        }
    });

    router.delete("/deactivate/", async (request, response,next:NextFunction) => { 
        try {
            const userId=request.userId as string;
            await desactiveUserAcaunt(userId);
            response.status(200).json({message:"Conta desativada com sucesso" })
        } catch (error) {
            next(error)
        }
    });

    server.use("/user", router);
}
export default userController;
