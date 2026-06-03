// "use client";

// import React from "react";

// type Props = {
//   location: string;
//   setLocation: (val: string) => void;

//   checkIn: Date | null;
//   setCheckIn: (date: Date | null) => void;

//   checkOut: Date | null;
//   setCheckOut: (date: Date | null) => void;

//   adults: number;
//   setAdults: (val: number) => void;

//   children: number;
//   setChildren: (val: number) => void;

//   rooms: number;
//   setRooms: (val: number) => void;

//   handleSubmit: (e: React.FormEvent) => void;

//   DatePicker: any; // keep as-is since you're already using it
// };

// export default function SearchBar({
//   location,
//   setLocation,
//   checkIn,
//   setCheckIn,
//   checkOut,
//   setCheckOut,
//   adults,
//   setAdults,
//   children,
//   setChildren,
//   rooms,
//   setRooms,
//   handleSubmit,
//   DatePicker,
// }: Props) {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
//       <div className="bg-white rounded-lg shadow-2xl p-4 md:p-6">
//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-col md:flex-row gap-3 md:gap-2 items-end">
            
//             {/* Location */}
//             <div className="flex-1 w-full md:w-auto">
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Where are you going?"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               />
//             </div>

//             {/* Check-in */}
//             <div className="flex-1 w-full md:w-auto">
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Check-in
//               </label>
//               <DatePicker
//                 value={checkIn}
//                 onChange={setCheckIn}
//                 placeholder="Check-in date"
//               />
//             </div>

//             {/* Check-out */}
//             <div className="flex-1 w-full md:w-auto">
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Check-out
//               </label>
//               <DatePicker
//                 value={checkOut}
//                 onChange={setCheckOut}
//                 placeholder="Check-out date"
//                 minDate={checkIn || undefined}
//               />
//             </div>

//             {/* Adults */}
//             <div className="w-24">
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Adults
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 value={adults}
//                 onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               />
//             </div>

//             {/* Children */}
//             <div className="w-24">
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Children
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={children}
//                 onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               />
//             </div>

//             {/* Rooms */}
//             <div className="w-24">
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Rooms
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 value={rooms}
//                 onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               />
//             {/* </div> */}

//             {/* Search Button */}
//             <button
//               type="submit"
//               className="w-full md:w-auto bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-semibold whitespace-nowrap"
//             >
//               Search
//             </button>

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }