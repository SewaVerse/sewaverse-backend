import { File as PrismaFile, VerificationDocument } from "@prisma/client";

import { creatPrismaFileFromFile } from "@/app/data-access/file";
import db from "@/lib/db";

import { VerificationDocumentSchema } from "../schemas/verificationSchema";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { verificationDocumentTypeMap } from "../utils/enumMap";

export const createVerificationDocumentFromSchema = dbAsyncHandler(
  async (serviceProviderId: string, data: VerificationDocumentSchema) => {
    let frontFile: PrismaFile | null = null;
    let backFile: PrismaFile | null = null;
    if (data.frontFile) {
      frontFile = await creatPrismaFileFromFile(data.frontFile.file);
    }

    if (data.backFile) {
      backFile = await creatPrismaFileFromFile(data.backFile.file);
    }

    return await upsertVerificationDocument({
      serviceProviderId: serviceProviderId,
      documentType:
        verificationDocumentTypeMap[
          data.documentType as keyof typeof verificationDocumentTypeMap
        ],
      documentNo: data.documentNumber ?? null,
      frontFileId: frontFile?.id ?? null,
      backFileId: backFile?.id ?? null,
    } as VerificationDocument);
  }
);

export const upsertVerificationDocument = dbAsyncHandler(
  async (data: VerificationDocument) => {
    if (data.id) {
      return await db.verificationDocument.update({
        where: { id: data.id },
        data,
      });
    }

    return await db.verificationDocument.create({
      data,
    });
  }
);
