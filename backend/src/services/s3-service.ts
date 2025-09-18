import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const bucketName = process.env.BUCKET_NAME!;
const s3Endpoint = process.env.S3_ENDPOINT!;

// Cliente S3 único
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  endpoint: s3Endpoint,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // necessário no LocalStack
});

// Criar bucket somente se não existir
export async function createBucket() {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log(`Bucket '${bucketName}' já existe.`);
  } catch {
    try {
      await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
      console.log(`Bucket '${bucketName}' criado com sucesso!`);
    } catch (error: any) {
      console.error("Erro ao criar bucket:", error.message);
      throw error;
    }
  }
}

// Upload de imagem
export async function uploadImage(
  file: Express.Multer.File,
  userId: string,
  type: "profile" | "activity"
) {
  let filePath: string;

  if (type === "profile") {
    filePath = `profileImages/${userId}/profile.png`; // sobrescreve sempre
  } else {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    filePath = `activityImages/${userId}/${uniqueFileName}`;
  }

  const uploadParams = {
    Bucket: bucketName,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype,
    Metadata: { uploadedBy: userId },
    ContentDisposition: `inline; filename="${file.originalname}"`,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));

    return {
      url: `${s3Endpoint}/${bucketName}/${filePath}`,
      key: filePath,
      contentType: file.mimetype,
    };
  } catch (error: any) {
    console.error("Erro ao fazer upload:", error.message);
    throw error;
  }
}
