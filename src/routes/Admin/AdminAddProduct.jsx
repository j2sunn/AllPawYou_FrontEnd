import Box from "@mui/material/Box";
import AddProduct from "./components/aAddProduct";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import { useEffect } from "react";

export default function AdminAddProduct() {
  
  useEffect(()=>{
    scrollTo(0,0);
  },[])
  
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <AddProduct />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
