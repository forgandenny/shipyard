
import { Loading, Stack } from "@carbon/react"
import { Link as RouterLink } from "react-router-dom"

import { AppError } from "../../components/AppError"
import styles from "./Starship.module.scss"
import { useGetStarshipsQuery } from "./starshipsApiSlice"
import getResourceId from "../../utils/resourceId"


export const Starships = () => {

  const { data, isError, isLoading, isSuccess } = useGetStarshipsQuery()

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

    return (
      <div className={styles.container}>
        <Stack gap={8}>
          <h1>Starships</h1>
          <nav>
            <ul>
              <Stack gap={4}>
                {data.map(({ name, url }) => {
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
        </Stack>
      </div>
    )
  }

  return null
}
