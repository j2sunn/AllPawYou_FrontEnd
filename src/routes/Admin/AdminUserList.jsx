import Box from "@mui/material/Box";
import AdminHeader from "../../components/common/AdminHeader";
import AdminFooter from "../../components/common/AdminFooter";
import UserList from "./components/aUserList";

export default function PermanentDrawerLeft() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <UserList />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
