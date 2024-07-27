import { useState } from "react"
import { Loading, PaginationNav, Stack } from "@carbon/react"
import { Link as RouterLink } from "react-router-dom"

import { AppError } from "../../components/AppError"
import styles from "./Starship.module.scss"
import { useGetStarshipsQuery } from "./starshipsApiSlice"

const pageSize = 10

function getResourceId(url: string) {
  let parts = url.split("/")
  let resourceId = parts[parts.length - 2]
  return resourceId
}

export const Starships = () => {
  const [currentPage, setCurrentPage] = useState(0)

  const { data, isError, isLoading, isSuccess } = useGetStarshipsQuery(
    currentPage + 1,
  )

  const pageHandler = (page: number) => {
    setCurrentPage(page)
  }

  if (isError) {
    return <AppError />
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loading withOverlay={false} />
      </div>
    )
  }

  if (isSuccess) {
    const numberOfPages = Math.ceil(data.count / pageSize)

    return (
      <div className={styles.container}>
        <Stack gap={8}>
          <h1>Starships</h1>
          <nav>
            <ul>
              <Stack gap={4}>
                {data.results.map(({ name, url }) => {
                  const id = getResourceId(url)
                  return (
                    <li key={`s${id}`}>
                      <RouterLink
                        aria-label={`View starship ${name}`}
                        data-testid={`starship${id}`}
                        className="cds--link cds--link--lg"
                        to={`starship/${id}`}
                      >
                        {name}
                      </RouterLink>
                    </li>
                  )
                })}
              </Stack>
            </ul>
          </nav>
          <PaginationNav
            page={currentPage}
            itemsShown={numberOfPages}
            totalItems={numberOfPages}
            onChange={pageHandler}
          />
        </Stack>
      </div>
    )
  }

  return null
}
