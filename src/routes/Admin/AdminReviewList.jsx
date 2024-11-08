import Box from "@mui/material/Box";
import ReviewList from "./components/aReviewList";
import AdminHeader from "../../components/common/AdminHeader";
import AdminFooter from "../../components/common/AdminFooter";

export default function PermanentDrawerLeft() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminHeader />

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <ReviewList />
        </Box>
      </Box>
      <AdminFooter />
    </>
  );
}
