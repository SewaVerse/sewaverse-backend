import db from "@/lib/db";

export const getCurrentFinYear = async () => {
  const finYearData = await db.financialYear.findFirst({
    where: {
      isActive: true,
    },
  });

  if (!finYearData) throw new Error("No active financial year found.");

  return finYearData?.finYear;
};
