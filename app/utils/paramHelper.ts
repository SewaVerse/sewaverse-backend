export const getPaginationParams = (searchParams: URLSearchParams) => {
  // Extract `page` and `limit` from query parameters
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  return {
    page: Math.max(page, 1),
    limit: Math.max(limit, 1),
  };
};

export const getParamValue = <T>(
  searchParams: URLSearchParams,
  key: string,
  defaultValue: T
): T => {
  const value = searchParams.get(key);
  if (!value) {
    return defaultValue;
  }

  if (typeof defaultValue === "number") {
    const numericValue = Number(value);

    return (isNaN(numericValue) ? defaultValue : numericValue) as T;
  }

  return value as unknown as T;
};
