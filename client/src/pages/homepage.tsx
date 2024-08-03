import { AppBar, Box, Button, styled, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MainRouteGuard from "../guards/MainRouteGuard";
import { RoomAndUserContextProvider } from "../contexts/ManageRoomAndUser";
// import TestBoard from "./TestBoard";
import Dashboard from "./Dashboard";

const SignUpButton = styled(Button)({
  color: "#63C57E",
  borderColor: "#63C57E",
  "&:hover": {
    borderColor: "#63C57E"
  }
})

function LandingComponent() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "calc(100% - 600px)",
          minWidth: "300px",
          height: "100%",
          background: "#63C57E",
          transform: "rotate(45deg) scale(2)",
          position: "absolute",
          left: "-50%",
        }}
      />

      <AppBar
        elevation={0}
        color="transparent"
        sx={{
          maxWidth: "100%",
          padding: {
            xs: "0 0px",
            sm: "0 20px",
            md: "0 40px",
          },
        }}
      >
        <Toolbar
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "12px",
            marginLeft: 0,
            marginRight: 0,
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            fontFamily="Poppins"
            fontSize={"2rem"}
            style={{
              color: "white",
            }}
          >
            MeetGaze
          </Typography>
          <Link to={"/signup"}>
            <SignUpButton variant="outlined">Signup</SignUpButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}



export default function HomePage() {
  return (
    <MainRouteGuard DefaultComponent={LandingComponent}>
      <RoomAndUserContextProvider>
        {/* <TestBoard /> */}
        <Dashboard />
      </RoomAndUserContextProvider>
    </MainRouteGuard>
  )
}
