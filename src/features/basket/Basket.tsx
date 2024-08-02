import {
  IconButton,
  Button,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
} from "@carbon/react"
import { TrashCan } from "@carbon/icons-react"
import {
  removeItem,
  selectItems,
  basketTotal,
  basketTotalCost,
} from "./basketSlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import formatter from "../../utils/formatter"

interface Props {
  onClick: (arg: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const BasketButton = ({ onClick }: Props) => {
  const total = useAppSelector(basketTotal)

  return total > 0 ? (
    <Button kind="ghost" size="lg" onClick={onClick} data-testid="basketButton">
      Basket (<span aria-label="basket total">{total}</span>)
    </Button>
  ) : null
}

export const BasketItems = () => {
  const items = useAppSelector(selectItems)
  const totalCost = useAppSelector(basketTotalCost)
  const dispatch = useAppDispatch()

  return (
    <div>
      <StructuredListWrapper isCondensed>
        {items.map(item => (
          <StructuredListRow key={`bi${item.id}`}>
            <StructuredListCell head>{item.name}</StructuredListCell>
            <StructuredListCell>x{item.amount}</StructuredListCell>
            <StructuredListCell>
              <IconButton
                size="sm"
                //style={{ margin: 0, padding: 0 }}
                kind="ghost"
                label="Remove"
                aria-label="Remove item"
                data-testid={`remove${item.id}`}
                onClick={() => dispatch(removeItem(item.id))}
              >
                <TrashCan />
              </IconButton>
            </StructuredListCell>
          </StructuredListRow>
        ))}
        <StructuredListRow>
          <StructuredListCell head>TOTAL</StructuredListCell>
          <StructuredListCell>{formatter(totalCost)}</StructuredListCell>
          <StructuredListCell> </StructuredListCell>
        </StructuredListRow>
      </StructuredListWrapper>
    </div>
  )
}
