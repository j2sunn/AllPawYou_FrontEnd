import { Outlet } from "react-router-dom"
import HeaderComponent from "./HeaderComponent"
import FooterComponent from "./FooterComponent"

const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  )
}

export default Layout;