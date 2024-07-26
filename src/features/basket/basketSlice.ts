import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface BasketSliceState {
  items: BasketItem[]
}

export interface BasketItem {
  id: string
  name: string
  amount: number
}

const initialState: BasketSliceState = {
  items: [],
}

export const basketSlice = createAppSlice({
  name: "basket",
  initialState,
  reducers: create => ({
    addItem: create.reducer((state, action: PayloadAction<BasketItem>) => {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      )
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].amount += action.payload.amount
      } else {
        state.items.push(action.payload)
      }
    }),
    removeItem: create.reducer((state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item: BasketItem) => item.id !== action.payload,
      )
    }),
  }),

  selectors: {
    selectItems: basket => basket.items,
    basketTotal: basket =>
      basket.items.reduce((total, item) => total + item.amount, 0),
  },
})

export const { addItem, removeItem } = basketSlice.actions

export const { selectItems, basketTotal } = basketSlice.selectors
