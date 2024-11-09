import Box from "@mui/material/Box";
import UpdateProduct from "./components/adUpdateProduct";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";

export default function PermanentDrawerLeft() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <UpdateProduct />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
