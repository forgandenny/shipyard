import formatter from './formatter'

describe("number formatting", it => {

  it("should correcly format non-number", () => {
    expect(formatter("undefined")).toBe("n/a")
  })
})
