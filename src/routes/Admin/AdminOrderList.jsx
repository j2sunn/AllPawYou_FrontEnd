import Box from "@mui/material/Box";
import OrderList from "./components/aOrderList";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import { useEffect } from "react";

export default function AdminOrderList() {
  
  useEffect(()=>{
    scrollTo(0,0);
  },[])

  return (
    <>
      <Box sx={{ display: "flex", minHeight: '850px' }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <OrderList />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
