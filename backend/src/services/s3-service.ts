import { CreateBucketCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const bucketName = process.env.BUCKET_NAME!;

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    endpoint: process.env.S3_ENDPOINT!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
});

export async function createBucket() {
    try {
        await s3.send(new CreateBucketCommand({ Bucket: bucketName, }));
        console.log('Bucket criado com sucesso!');
        return;
    } catch (error: any) {
       console.log("Erro ao criar Bucket");
    }
}

export async function uploadImage(file: Express.Multer.File, userId: string, type: "profile" | "activity") {
    let filePath: string;

    if (type === "profile") {
        filePath = `profileImages/${userId}/profile.png`;
    } else {
        const uniqueFileName = `${uuidv4()}-${file.originalname}`;
        filePath = `activityImages/${userId}/${uniqueFileName}`;
    }

    const uploadParams = {
        Bucket: bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3.send(new PutObjectCommand(uploadParams));
        return `${process.env.S3_ENDPOINT}/${bucketName}/${filePath}`;
    } catch (error) {
        throw error;
    }
}