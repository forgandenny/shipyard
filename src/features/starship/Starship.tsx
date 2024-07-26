import { useState, useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import {
  Stack,
  Button,
  NumberInput,
  Loading,
  ToastNotification,
  Grid,
  Column,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
} from "@carbon/react"

import { Error } from "../../components/Error"
import { useGetStarshipByIdQuery } from "./starshipsApiSlice"
import { useAppDispatch } from "../../app/hooks"
import { type BasketItem, addItem } from "../basket/basketSlice"
import styles from "./Starship.module.scss"

export const Starship = () => {
  const { id } = useParams()
  const { data, isError, isLoading, isSuccess } = useGetStarshipByIdQuery(
    Number(id),
  )
  const dispatch = useAppDispatch()

  const [count, setCount] = useState(1)
  const [buyCount, setBuyCount] = useState(1)
  const [showToast, setShowToast] = useState(false)

  const descriptionItems = useMemo(() => {
    return [
      {
        label: "Model",
        text: data?.model,
      },
      {
        label: "Class",
        text: data?.starship_class,
      },
      {
        label: "Max Speed",
        text: data?.max_atmosphering_speed,
      },
      {
        label: "MGLT",
        text: data?.MGLT,
      },
      {
        label: "Crew",
        text: data?.crew,
      },
      {
        label: "Passengers",
        text: data?.passengers,
      },
      {
        label: "Cargo capacity",
        text: data?.cargo_capacity,
      },
      {
        label: "Consumables",
        text: data?.consumables,
      },
    ]
  }, [data])

  const handleCount = useCallback(
    (
      _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      { value }: { value: string | number },
    ) => {
      setCount(Number(value))
    },
    [],
  )

  const handleBuy = useCallback(() => {
    setBuyCount(count)
    const item: BasketItem = {
      id: id!,
      name: data?.name ?? "unknown",
      amount: count,
    }
    if (showToast) {
      setShowToast(false)
    }
    dispatch(addItem(item))
    setShowToast(true)
  }, [dispatch, id, data, count, showToast])

  if (isError) {
    return <Error />
  }

  if (isLoading) {
    return <Loading withOverlay={false} />
  }

  if (isSuccess) {
    return (
      <>
        {showToast ? (
          <div className={styles.topRight}>
            <ToastNotification
              aria-label="closes notification"
              lowContrast
              kind="info"
              onClose={() => setShowToast(false)}
              onCloseButtonClick={function noRefCheck() {}}
              role="status"
              statusIconDescription="notification"
              subtitle="Added to basket"
              timeout={2000}
              title={`${buyCount}x ${data.name}`}
            />
          </div>
        ) : null}
        <Grid>
          <Column sm={4} md={8} lg={8}>
            <Stack gap={6}>
              <h1 aria-label="Starship name">{data.name}</h1>
              <p>{data.manufacturer}</p>
              <div className={styles.heroPadding} />
            </Stack>
          </Column>
          <Column sm={4} md={8} lg={8}>
            <StructuredListWrapper>
              {descriptionItems.map(item => (
                <StructuredListRow key={`bi${item.label}`}>
                  <StructuredListCell head>{item.label}</StructuredListCell>
                  <StructuredListCell>{item.text}</StructuredListCell>
                </StructuredListRow>
              ))}
            </StructuredListWrapper>
            <div className={styles.buyContainer}>
              <Stack gap={2}>
                <NumberInput
                  id="carbon-number"
                  min={1}
                  max={10}
                  value={count}
                  label="How many starships to buy (max 10)"
                  invalidText="You can only add beween 1 and 10 starships at a time"
                  onChange={handleCount}
                />
                <Button
                  aria-label="Buy starship"
                  type="button"
                  onClick={handleBuy}
                >
                  BUY
                </Button>
              </Stack>
            </div>
          </Column>
        </Grid>
      </>
    )
  }

  return <>not found</>
}
