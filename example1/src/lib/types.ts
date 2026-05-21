/**
 * API成功レスポンス
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * APIエラーレスポンス
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
  };
}

/**
 * APIレスポンス型
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * ヘルスチェックレスポンス
 */
export interface HealthCheckResponse {
  status: "ok";
  timestamp: string;
}

export interface ConversionRate {
  currency: string;
  name: string;
  rate: number;
  result: number;
}

export type ConversionState =
  | { status: 'idle' }
  | { status: 'success'; amount: number; from: string; date: string; rates: ConversionRate[] }
  | { status: 'error'; message: string };

export interface RateHistoryPoint {
  date: string;
  rate: number;
}

export type RateHistoryState =
  | { status: 'idle' }
  | { status: 'success'; from: string; to: string; points: RateHistoryPoint[] }
  | { status: 'error'; message: string };
