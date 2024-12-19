export const mongoId = (slug: string) => {
  return /^[0-9a-fA-F]{24}$/.test(slug);
};
