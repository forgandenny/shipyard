import { screen, waitFor, cleanup } from "@testing-library/react"

import App from "./App"
import { renderWithProviders } from "./utils/test-utils"
import { server } from "./mocks/node"
import { MemoryRouter as Router } from "react-router-dom"

beforeAll(() => server.listen())
afterEach(() => {
  cleanup()
  server.resetHandlers()
})
afterAll(() => server.close())

test("App should have correct initial render", async () => {
  renderWithProviders(
    <Router>
      <App />
    </Router>,
  )

  // The app should be rendered correctly

  await waitFor(() =>
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Starships",
    ),
  )

  // Basket should not be rendered
  expect(screen.queryByTestId("basketButton")).toBeNull()
})

test("Navigating to and from starship page should work as expected", async () => {
  const { user } = renderWithProviders(
    <Router>
      <App />
    </Router>,
  )

  // Wait for starships to load
  await waitFor(() =>
    expect(
      screen.getAllByLabelText("View starship", { exact: false }).length,
    ).toBe(2),
  )

  // Click on a first starship
  await user.click(screen.getByTestId("starship1"))

  await waitFor(() =>
    expect(screen.getByLabelText("Starship name")).toHaveTextContent(
      "Starship One",
    ),
  )
})

test("Buying starship should update basket total", async () => {
  const { user } = renderWithProviders(
    <Router>
      <App />
    </Router>,
  )

  // Wait for starships to load
  await waitFor(
    () => screen.getAllByLabelText("View starship", { exact: false }).length,
  )

  // Click on a second starship
  await user.click(screen.getByTestId("starship2"))

  await waitFor(() =>
    expect(screen.getByTestId("starshipName")).toHaveTextContent(
      "Starship Two",
    ),
  )

  await user.click(screen.getByLabelText("Increment number"))
  await user.click(screen.getByLabelText("Increment number"))
  await user.click(screen.getByLabelText("Increment number"))
  await user.click(screen.getByTestId("buyStarship"))

  expect(screen.queryByTestId("basketButton")).toBeInTheDocument()

  expect(screen.getByLabelText("basket total")).toHaveTextContent("4")
})

test("Buying starship should add items to basket", async () => {
  const { user } = renderWithProviders(
    <Router>
      <App />
    </Router>,
  )

  // Wait for starships to load
  await waitFor(
    () => screen.getAllByLabelText("View starship", { exact: false }).length,
  )

  // Click on a first starship
  await user.click(screen.getByTestId("starship1"))

  await waitFor(() =>
    expect(screen.getByTestId("starshipName")).toHaveTextContent(
      "Starship One",
    ),
  )

  await user.click(screen.getByTestId("buyStarship"))

  expect(screen.queryByTestId("basketButton")).toBeInTheDocument()

  await user.click(screen.getByTestId("basketButton"))

  expect(screen.queryByTestId("remove1")).toBeInTheDocument()

  await user.click(screen.getByTestId("remove1"))

  // Basket should not be rendered
  expect(screen.queryByTestId("basketButton")).toBeNull()
})
