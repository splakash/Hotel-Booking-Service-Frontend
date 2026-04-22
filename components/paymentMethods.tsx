import { UPIIcon, CardIcon, WalletIcon, HotelIcon } from "./ui/icons";
import { PaymentMethod } from "@/types/payment";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "upi",
    label: "UPI",
    description: "Pay via any UPI app",
    icon: <UPIIcon />,
    disabled: true,
    badge: "Coming Soon",
    subOptions: ["Google Pay", "PhonePe", "Paytm", "BHIM"],
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: <CardIcon />,
    disabled: true,
    badge: "Coming Soon",
  },
  {
    id: "wallet",
    label: "Wallets",
    description: "Paytm, Amazon Pay & more",
    icon: <WalletIcon />,
    disabled: true,
    badge: "Coming Soon",
  },
  {
    id: "hotel",
    label: "Pay at Hotel",
    description: "Pay when you check in",
    icon: <HotelIcon />,
    disabled: false,
    badge: "Available",
  },
];
