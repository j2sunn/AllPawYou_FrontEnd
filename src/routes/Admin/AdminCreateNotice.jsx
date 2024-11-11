import Box from "@mui/material/Box";
import CreateNotice from "./components/aCreateNotice";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import { useEffect } from "react";

export default function AdminCreateNotice() {
  
  useEffect(()=>{
    scrollTo(0,0);
  },[])

  return (
    <>
      <Box sx={{ display: "flex", minHeight: '850px' }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <CreateNotice />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
