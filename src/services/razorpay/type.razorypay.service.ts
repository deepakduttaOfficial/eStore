/**
 * Interface for creating an order with basic details for Razorpay.
 */
export interface RazorpayCreateOrder {
  amount: number; // Order amount in paise (e.g., 1000 paise = ₹10)
  currency: string; // Currency code (e.g., "INR" for Indian Rupees)
  receipt: string;
  notes?: Record<string, string>;
}

/**
 * Interface for a successful order response from Razorpay.
 */
export interface RazorpayOrderSuccessResponse {
  id: string;
  entity: string;
  amount: number; // Order amount in paise
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

/**
 * Interface describing a Razorpay order error.
 */
export interface RazorpayOrderError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: Record<string, unknown>;
  field: string;
}

/**
 * Interface for an error order response from Razorpay.
 */
export interface RazorpayOrderErrorResponse {
  error: RazorpayOrderError;
}

/**
 * Interface for a successful payment response from Razorpay.
 */
export interface RazorpayPaymentSuccessResponse {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  invoice_id: null | string;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: null | string;
  captured: boolean;
  description: string;
  card_id: string;
  bank: null | string;
  wallet: null | string;
  vpa: null | string;
  email: string;
  contact: string;
  customer_id: string;
  token_id: string;
  notes: unknown[]; // Array of notes
  fee: number;
  tax: number;
  error_code: null | string;
  error_description: null | string;
  error_source: null | string;
  error_step: null | string;
  error_reason: null | string;
  acquirer_data: {
    auth_code: string;
    arn: string;
    rrn: string;
  };
  created_at: number;
}

/**
 * Interface describing a Razorpay payment error.
 */
export interface RazorpayPaymentError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: Record<string, unknown>;
}

/**
 * Interface for an error payment response from Razorpay.
 */
export interface RazorpayPaymentErrorResponse {
  error: RazorpayPaymentError;
}
