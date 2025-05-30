import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResStatus } from '../common/types';

export function throwFormattedHttpException(
  cardStatus: ApiResStatus,
  statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
): never {
  const errorPayload = [
    {
      status: cardStatus.status ?? 'N',
      responseCode: cardStatus.responseCode ?? '400',
      responseReason: cardStatus.responseReason ?? 'UNKNOWN_REASON',
      responseDesc: cardStatus.responseDesc ?? 'An unknown error occurred',
      errors: cardStatus.errors ?? [],
    },
  ];

  throw new HttpException(
    {
      status: false,
      statusCode,
      message: cardStatus.responseReason ?? 'Error occurred',
      data: [],
      error: errorPayload,
    },
    statusCode,
  );
}
