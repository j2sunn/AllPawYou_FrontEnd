import Box from "@mui/material/Box";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import UserList from "./components/aUserList";

export default function PermanentDrawerLeft() {
  return (
    <>
      <Box sx={{ display: "flex", marginLeft: '240px', minHeight: '850px' }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <UserList />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
