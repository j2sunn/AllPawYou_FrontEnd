import Box from "@mui/material/Box";
import OrderList from "./components/aOrderList";
import AdminHeader from "../../components/common/AdminHeader";
import AdminFooter from "../../components/common/AdminFooter";

export default function PermanentDrawerLeft() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <OrderList />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
