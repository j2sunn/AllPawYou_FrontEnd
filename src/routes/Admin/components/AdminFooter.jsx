import { Box, Typography, Link } from "@mui/material";

const AdminFooter = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        bgcolor: "#527853",
        textAlign: "center"
      }}
    >
      <Typography variant="body2" color="white">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
      <Typography variant="body2" color="white">
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
