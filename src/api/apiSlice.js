import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ['Rooms'],
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => "rooms",
      providesTags: ['Rooms'],
    }),
    getRoomsId: builder.query({
      query: (id) => `rooms/${id}`,
    }),
   
    AddReservation: builder.mutation({
      query: (newReservation) => ({
        url: "rooms",
        method: "POST",
        body: newReservation,
      }),
      invalidatesTags: ['Rooms'],
    }),
 
  }),
});

export const {
  useGetRoomsIdQuery,
  useGetRoomsQuery,
  useAddReservationMutation,
} = apiSlice;
