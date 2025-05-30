import { AxiosError, AxiosResponse } from 'axios';
import { ErrorDetail, ErrorResponse } from '../common/types';

function normalizeErrors(errors: ErrorDetail[] = []): ErrorDetail[] {
  return errors.map((err) => ({
    msg: err.msg || err.message || 'Unknown error',
    param: err.param || '',
    location: err.location || '',
  }));
}

export function handleAxiosError(error: AxiosError): never {
  const errorData = error.response?.data as ErrorResponse;

  const normalizedErrors = normalizeErrors(errorData?.errors);

  throw new AxiosError(errorData?.message || 'Unknown error', error.code, error.config, error.request, {
    ...error.response,
    data: {
      status: false,
      statusCode: error.response?.status || errorData?.code || 500,
      message: errorData?.message || 'Something went wrong',
      data: [],
      error: normalizedErrors,
    },
  } as AxiosResponse);
}
