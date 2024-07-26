import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Categories {
  people: string
  planets: string
  films: string
  species: string
  vehicles: string
  starships: string
}

// Define a service using a base URL and expected endpoints
export const categoriesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  reducerPath: "categoriesApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Categories"],
  endpoints: build => ({
    getCategories: build.query<Categories, void>({
      query: () => "/",
      providesTags: (result, error) => [{ type: "Categories" }],
      keepUnusedDataFor: 9600,
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApiSlice
