import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import path from "node:path";

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
  id: string,
  type: "profile" | "activity"
) {
  const extension = path.extname(file.originalname);
  let filePath: string;

  if (type === "profile") {
    filePath = `profileImages/${id}/profile${extension}`;
  } else {

    filePath = `activityImages/${id}/activityImage${extension}`;
  }

  const uploadParams = {
    Bucket: bucketName,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype,
    Metadata: { uploadedBy: id },
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
