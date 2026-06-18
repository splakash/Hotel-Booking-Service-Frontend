// 'use server'
import { BookingPayload,Booking, Bookings } from "@/types/booking";
import { Console } from "console";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const saveBookingInfo = async(
    bookingPayload: BookingPayload
) => {
       const response = await fetch(`${API_URL}/v1/res/reserve/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(bookingPayload),
      });
      if (!response.ok) {
        throw new Error("Booking creation failed");
      }
      return await response.text();
}


export const fetchBookingDetails = async( bookingId : string) : Promise<Bookings> =>  {
    const response = await fetch(`${API_URL}/v1/res/booking/${bookingId}`,{
      method: "GET",
      credentials:"include"
    });
    if (!response.ok) {
    throw new Error(`Failed to fetch Booking details: ${response.statusText}`)
  }
  return response.json();
}


//write an api call to fetch booking details by customer 
export const BookingDetailsPerCustomer =

  async (): Promise<Bookings[]> => {
    try {
      
      const response = await fetch(
        `${API_URL}/v1/res/my-bookings`,
        {
          method: "GET",
          credentials: "include", 
        });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch booking details:
          ${response.status}`
        );
      }
      const data: Bookings[] =
        await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
};

export const confirmPayAtHotelBooking = async (
  bookingId: string
): Promise<void> => {
  const response = await fetch(
    `${API_URL}/v1/res/payments/success/${bookingId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to confirm booking");
  }
};
