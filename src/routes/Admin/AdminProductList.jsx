import Box from "@mui/material/Box";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import ProductList from "./components/aProductList";
import { useEffect } from "react";

export default function PermanentDrawerLeft() {
  
  useEffect(()=>{
    scrollTo(0,0);
  },[])

  return (
    <>
      <Box sx={{ display: "flex", marginLeft: '240px', minHeight: '850px' }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <ProductList />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
