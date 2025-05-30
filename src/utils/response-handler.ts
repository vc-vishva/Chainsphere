import { CommonResponse } from '../common/types';

/**
 * Description -Response Handler Utility Function
 */
export class ResponseHandler {
  /**
   * Description - Handler for Success Response
   * @param data
   * @param message
   * @param statusCode
   * @returns
   */
  public static success<T>(data: T, message: string | string[], statusCode: number): CommonResponse<T> {
    return {
      status: true,
      statusCode,
      message,
      data: data || [],
      error: [],
    };
  }

  /**
   * Description - Handler for Error Response
   * @param error
   * @param message
   * @param statusCode
   * @returns
   */
  public static error<T>(
    error: T,
    message: string | string[],
    statusCode: number,
    additionalError?: T,
  ): CommonResponse<T> {
    if (error === 'isAxiosError') {
      return {
        status: false,
        statusCode,
        message,
        data: [],
        error,
      };
    }
    return {
      status: false,
      statusCode,
      message: message || 'An error occurred',
      data: [],
      error: additionalError || error,
    };
  }
}
