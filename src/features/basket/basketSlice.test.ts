import type { AppStore } from "../../app/store"
import { makeStore } from "../../app/store"
import type { BasketItem, BasketSliceState } from "./basketSlice"
import {
  basketSlice,
  addItem,
  removeItem,
  selectItems,
  basketTotal,
  basketTotalCost,
} from "./basketSlice"

interface LocalTestContext {
  store: AppStore
}

const itemOne: BasketItem = {
  id: "1",
  name: "test item",
  amount: 1,
  cost: 10,
}

const itemTwo: BasketItem = {
  id: "2",
  name: "another test item",
  amount: 1,
  cost: 20,
}

describe<LocalTestContext>("counter reducer", it => {
  beforeEach<LocalTestContext>(context => {
    const initialState: BasketSliceState = {
      items: [],
    }

    const store = makeStore({ basket: initialState })

    context.store = store
  })

  it("should handle initial state", () => {
    expect(basketSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
      items: [],
    })
  })

  it("should handle add item", ({ store }) => {
    expect(selectItems(store.getState()).length).toBe(0)
    expect(basketTotal(store.getState())).toBe(0)

    store.dispatch(addItem(itemOne))

    expect(selectItems(store.getState()).length).toBe(1)
    expect(basketTotal(store.getState())).toBe(1)
  })

  it("should correctly calculate totals", ({ store }) => {
    expect(selectItems(store.getState()).length).toBe(0)
    expect(basketTotal(store.getState())).toBe(0)

    store.dispatch(addItem({ ...itemOne }))
    store.dispatch(addItem({ ...itemOne, amount: 2 }))
    store.dispatch(addItem(itemTwo))

    // Should not duplicate Item One in basket
    expect(selectItems(store.getState()).length).toBe(2)
    // Should increment Item One amount
    expect(selectItems(store.getState())[0].amount).toBe(3)
    // Should correctly calculate basket total items
    expect(basketTotal(store.getState())).toBe(4)
    // Should correctly calculate basket total cost
    expect(basketTotalCost(store.getState())).toBe(50)
  })

  it("should handle remove item", ({ store }) => {
    store.dispatch(addItem(itemOne))
    store.dispatch(addItem(itemTwo))
    store.dispatch(removeItem("2"))
    expect(selectItems(store.getState()).length).toBe(1)
    expect(basketTotal(store.getState())).toBe(1)
    expect(basketTotalCost(store.getState())).toBe(itemOne.cost)
  })
})
