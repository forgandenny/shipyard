import { HeaderMenuItem, SkeletonText } from "@carbon/react"

import { Error } from "../../components/Error"
import { useGetCategoriesQuery } from "./categoriesApiSlice"

export const Categories = () => {
  const { data, isError, isLoading, isSuccess } = useGetCategoriesQuery()

  if (isError) {
    return <Error />
  }

  if (isLoading) {
    return <SkeletonText />
  }

  if (isSuccess) {
    return (
      <>
        {Object.keys(data).map(category => {
          return (
            <HeaderMenuItem href="#" key={`c${category}`}>
              {category}
            </HeaderMenuItem>
          )
        })}
      </>
    )
  }

  return null
}
