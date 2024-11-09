import { Box, Typography, Link } from "@mui/material";

const AdminFooter = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        bgcolor: "#527853",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Link href="#" color="inherit" sx={{ mx: 1 }}>
          Terms of Service
        </Link>
        <Link href="#" color="inherit" sx={{ mx: 1 }}>
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default AdminFooter;
