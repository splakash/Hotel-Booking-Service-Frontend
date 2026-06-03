import { Bookings } from "./booking";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  description: string;
  icon: React.ReactNode;
  disabled: boolean;
  badge: string;
  subOptions?: string[];
}
export type PaymentMethodId = "upi" | "card" | "wallet" | "hotel";

export interface PaymentMethodCardProps {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
}

export interface BookingSummaryCardProps {
  booking: Bookings;
}

export interface SuccessScreenProps {
  booking: Bookings;
  paymentMethod: PaymentMethodId;
}


