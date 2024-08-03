import { useState, useCallback, useMemo } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
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
  Breadcrumb,
  BreadcrumbItem
} from "@carbon/react"

import { AppError } from "../../components/AppError"
import { type Starship as StarshipType, useGetStarshipsQuery, useGetStarshipByIdQuery } from "./starshipsApiSlice"
import { useAppDispatch } from "../../app/hooks"
import { type BasketItem, addItem } from "../basket/basketSlice"
import formatter from "../../utils/formatter"
import resourceId from "../../utils/resourceId"
import styles from "./Starship.module.scss"

const maxCount = 10

export const Starship = () => {
  const { id } = useParams()
  const { state: routeState } = useLocation();
  const from = routeState ? routeState.from : 1;

  const { data: rootData, isError: isRootError, isLoading: isRootLoading, isSuccess: isRootSuccess } = useGetStarshipsQuery(
    from, { skip: routeState === null }
  )

  const skipStarshipsLoad = typeof rootData !== "undefined" || isRootLoading;

  const { data: shipData, isError: isShipError, isLoading: isShipLoading, isSuccess: isShipSuccess } = useGetStarshipByIdQuery(
    Number(id), { skip: skipStarshipsLoad }
  )

  const data = shipData ?? rootData?.results.find((ship: StarshipType) => resourceId(ship.url) === id);
  const isError = isShipError || isRootError
  const isLoading = isRootLoading || isShipLoading
  const isSuccess = isRootSuccess || isShipSuccess

  const dispatch = useAppDispatch()

  const [count, setCount] = useState(1)
  const [buyCount, setBuyCount] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const [canAdd, setCanAdd] = useState(true)


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
      {
        label: "Cost",
        text: formatter(data?.cost_in_credits ?? ""),
      },
    ]
  }, [data])

  const handleCount = useCallback(
    (
      _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      { value }: { value: string | number },
    ) => {
      const countValue = Number(value);
      if (countValue > maxCount) {
        setCanAdd(false)
      } else if (canAdd === false) {
        setCanAdd(true)
      }
      setCount(countValue)
    },
    [canAdd],
  )

  const handleBuy = useCallback(() => {
    setBuyCount(count)
    const item: BasketItem = {
      id: id!,
      name: data?.name ?? "unknown",
      amount: count,
      cost: !isNaN(Number(data?.cost_in_credits))
        ? Number(data?.cost_in_credits)
        : 0,
    }
    if (showToast) {
      setShowToast(false)
    }
    dispatch(addItem(item))
    setShowToast(true)
  }, [dispatch, id, data, count, showToast])

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

  if (isSuccess && typeof data !== "undefined") {
    return (
      <>
        {showToast ? (
          <div className={styles.topRight}>
            <ToastNotification
              aria-label="closes notification"
              lowContrast
              kind="info"
              onClose={() => setShowToast(false)}
              onCloseButtonClick={function noRefCheck() { }}
              role="alert"
              statusIconDescription="notification"
              subtitle="Added to basket"
              timeout={2000}
              data-testid="notification"
              title={`${buyCount}x ${data.name}`}
            />
          </div>
        ) : null}
        <Grid>
          <Column sm={4} md={8} lg={8}>
            <Stack gap={6}>
              <Breadcrumb noTrailingSlash>
                <BreadcrumbItem>
                  <Link to="/" state={{ from }}>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  {data.name}
                </BreadcrumbItem>
              </Breadcrumb>

              <h1 aria-label="Starship name" data-testid="starshipName">
                {data.name}
              </h1>
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
                  max={maxCount}
                  value={count}
                  label="How many starships to buy (max 10)"
                  invalidText="You can only add beween 1 and 10 starships at a time"
                  onChange={handleCount}
                />
                <Button
                  aria-label="Buy starship"
                  data-testid="buyStarship"
                  type="button"
                  onClick={handleBuy}
                  disabled={!canAdd}
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
