// Layout.tsx

import { Grid, Column } from "@carbon/react"
import { Outlet } from "react-router-dom"

import Header from "./Header"

const Layout = () => {
  return (
    <div className="App">
      <Header />
      <Grid condensed className="main-content">
        <Column sm={4} md={8} lg={16}>
          <Outlet />
        </Column>
      </Grid>
    </div>
  )
}

/*

const Layout = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Basket />
        <Categories />
        <Logo />
        <main>
          <Outlet />
        </main>
      </header>
    </div>
  )
}

*/

export default Layout
