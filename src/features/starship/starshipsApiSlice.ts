// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export default interface Resource {
  url: string
  id: string
  created: string
  edited: string
}

export interface Starship {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  url: string
  pilots: string[]
  films: string[]
}

export type StarshipsApiResponse = Starship[]

// Define a service using a base URL and expected endpoints
export const starshipsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.info/api" }),
  reducerPath: "starshipsApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Starships", "Starship"],
  endpoints: build => ({
    getStarships: build.query<StarshipsApiResponse, void>({
      query: () => `/starships`,
      providesTags: (result, error, page) => [{ type: "Starships", page }],
      keepUnusedDataFor: 3600,
    }),
    getStarshipById: build.query<Starship, number>({
      query: (id: number) => `/starships/${id}`,
      providesTags: (result, error, id) => [{ type: "Starship", id }],
      keepUnusedDataFor: 3600,
    }),
  }),
})

export const { useGetStarshipsQuery, useGetStarshipByIdQuery } =
  starshipsApiSlice
