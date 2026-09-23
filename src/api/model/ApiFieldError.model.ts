export type ApiFieldErrorResponse = {
  detail?: string;
  status: number;
  title?: string;
  violations: ApiFieldViolation[];
};

export type ApiFieldViolation = {
  field: string;
  message: string;
};
