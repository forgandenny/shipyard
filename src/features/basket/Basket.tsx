import {
  IconButton,
  Button,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
} from "@carbon/react"
import { TrashCan } from "@carbon/icons-react"
import { removeItem, selectItems, basketTotal } from "./basketSlice"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

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
                style={{ margin: 0, padding: 0 }}
                kind="ghost"
                label="Remove"
                aria-label="Remove item"
                onClick={() => dispatch(removeItem(item.id))}
              >
                <TrashCan />
              </IconButton>
            </StructuredListCell>
          </StructuredListRow>
        ))}
      </StructuredListWrapper>
    </div>
  )
}
