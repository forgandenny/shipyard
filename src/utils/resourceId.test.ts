import getResourceId from './resourceId'

describe("resource id", it => {

  it("should correcly get resource ID from URL", () => {
    expect(getResourceId("https://swapi.dev/api/starships/1/")).toBe("1")
  })
})
