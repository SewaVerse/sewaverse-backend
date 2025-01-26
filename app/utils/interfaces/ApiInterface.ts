export type BaseResponse<T = null> = {
  status: number;
  message: string;
  data: T;
};
