export const getPaginationParams = (searchParams: URLSearchParams) => {
  // Extract `page` and `limit` from query parameters
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  return {
    page: Math.max(page, 1),
    limit: Math.max(limit, 1),
  };
};
