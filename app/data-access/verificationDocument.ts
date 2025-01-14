import {
  Prisma,
  File as PrismaFile,
  VerificationDocument,
} from "@prisma/client";

import { creatPrismaFileFromFile } from "@/app/data-access/file";
import db from "@/lib/db";

import { VerificationDocumentSchema } from "../schemas/verificationSchema";
import { dbAsyncHandler } from "../utils/asyncHelper/dbAsyncHandler";
import { verificationDocumentTypeMap } from "../utils/enumMap";

export const createVerificationDocumentFromSchema = dbAsyncHandler(
  async (
    serviceProviderId: string,
    data: VerificationDocumentSchema,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    let frontFile: PrismaFile | null = null;
    let backFile: PrismaFile | null = null;
    if (data.frontFile) {
      frontFile = await creatPrismaFileFromFile(
        data.frontFile.file!,
        prismaClient
      );
    }

    if (data.backFile) {
      backFile = await creatPrismaFileFromFile(
        data.backFile.file!,
        prismaClient
      );
    }

    return await upsertVerificationDocument(
      {
        serviceProviderId: serviceProviderId,
        documentType:
          verificationDocumentTypeMap[
            data.documentType as keyof typeof verificationDocumentTypeMap
          ],
        documentNo: data.documentNumber ?? null,
        frontFileId: frontFile?.id ?? null,
        backFileId: backFile?.id ?? null,
      } as VerificationDocument,
      prismaClient
    );
  }
);

export const upsertVerificationDocument = dbAsyncHandler(
  async (
    data: VerificationDocument,
    tx: Prisma.TransactionClient | null = null
  ) => {
    const prismaClient = tx || db;
    if (data.id) {
      return await prismaClient.verificationDocument.update({
        where: { id: data.id },
        data,
      });
    }

    return await prismaClient.verificationDocument.create({
      data,
    });
  }
);
