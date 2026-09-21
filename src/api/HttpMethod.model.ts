export const HttpMethod = {
  DELETE: 'delete',
  GET: 'get',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put',
} as const;

export type HttpMethodType = (typeof HttpMethod)[keyof typeof HttpMethod];
