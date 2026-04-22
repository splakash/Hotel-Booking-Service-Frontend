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
  booking: BookingSummary;
}

export interface SuccessScreenProps {
  booking: BookingSummary;
  paymentMethod: PaymentMethodId;
}


 export interface BookingSummary {
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  roomRate: number;
  taxes: number;
  total: number;
  bookingRef: string;
  guestName: string;
  guestEmail: string;
}