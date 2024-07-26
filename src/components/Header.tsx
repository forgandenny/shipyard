// Header.tsx
import { useState, useCallback } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"

import { Categories } from "../features/categories/Categories"
import { BasketButton, BasketItems } from "../features/basket/Basket"
import { basketTotal } from "../features/basket/basketSlice"
import { useAppSelector } from "../app/hooks"
import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderGlobalBar,
  HeaderPanel,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  SideNavItems,
} from "@carbon/react"

const AppHeader = () => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false)
  const onClickSideNavExpand = useCallback(
    () => setIsSideNavExpanded(!isSideNavExpanded),
    [isSideNavExpanded],
  )

  const [isBasketExpanded, setIsBasketExpanded] = useState(false)

  const total = useAppSelector(basketTotal)

  const isMobile = useMediaQuery({ query: "(max-width: 1055px)" })
  const navigate = useNavigate()

  return (
    <Header aria-label="SW Shipyard">
      <SkipToContent />
      <HeaderMenuButton
        aria-label={
          isSideNavExpanded ? "Close categories menu" : "Open categories menu"
        }
        onClick={onClickSideNavExpand}
        isActive={isSideNavExpanded}
        aria-expanded={isSideNavExpanded}
      />
      <HeaderName
        style={{ cursor: "pointer" }}
        prefix="SW"
        arial-label="Return to homepage"
        onClick={() => navigate("/")}
      >
        Shipyard
      </HeaderName>
      <HeaderNavigation aria-label="SW Shipyard">
        <Categories />
      </HeaderNavigation>
      <HeaderGlobalBar>
        <BasketButton onClick={() => setIsBasketExpanded(!isBasketExpanded)} />
      </HeaderGlobalBar>
      <HeaderPanel expanded={isBasketExpanded && total > 0}>
        <BasketItems />
      </HeaderPanel>
      {isMobile ? (
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          defaultExpanded={false}
          onSideNavBlur={onClickSideNavExpand}
          href="#main-content"
        >
          <SideNavItems>
            <HeaderSideNavItems>
              <Categories />
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
      ) : null}
    </Header>
  )
}
export default AppHeader
