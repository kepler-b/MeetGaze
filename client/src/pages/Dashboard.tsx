import React, { useState } from "react";
import { useRoomAndUserContext } from "../contexts/ManageRoomAndUser";
import { signOutFromApp, useAuth } from "../contexts/AuthContext";
import {
  AppBar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  Snackbar,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { CopyAll, ExitToApp, VideoCall, VideoCallOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#63c57d",
    },
  },
});

type MainContentProps = {
  children?: React.ReactNode
};

const MainContent = ({}: MainContentProps) => {
  const {
    setRoomId,
    setJoining,
    roomId
  } = useRoomAndUserContext();

  const [conferenceURL, setConferenceURL] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { user } = useAuth();

  async function getRoomID() {
    const body = JSON.stringify({
      uid: user?.uid,
      username: user?.displayName,
    });
    console.log(body);
    const response = await fetch(
      "https://meet-gaze-server-09473cfba665.herokuapp.com/create-room",
      {
        method: "POST",
        body,
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const { roomId }: { roomId: string } = await response.json();
    return roomId;
  }

  async function createCall(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const roomId = await getRoomID();
    setRoomId && setRoomId(roomId);
    setConferenceURL("https://meetgaze.web.app/room/join/" + roomId);
    setJoining!(false);
  }
  async function handleCloseSnackbar() {
    setOpenSnackbar(false);
  }

  if (!conferenceURL) {
    return (
      <Box
        height={"100vh"}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        flexDirection="column"
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Button onClick={createCall}>
          <VideoCall /> Create Chat Room
        </Button>
      </Box>
    );
  }

  return (
    <Box
      height={"100vh"}
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      flexDirection="column"
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.1)",
          margin: "12px 0",
          padding: "4px 12px",
          borderRadius: "4px",
        }}
      >
        <Typography color="#63c57d">{conferenceURL}</Typography>
        <Button
          sx={{
            paddingRight: 0,
            paddingLeft: 0,
            marginLeft: "12px",
            background: "rgba(255, 255, 255, 0.5)",
          }}
          onClick={(e) => {
            e.preventDefault();
            console.log("Copying...");
            navigator.clipboard
              .writeText(conferenceURL)
              .then(() => {
                setOpenSnackbar(true);
              })
              .catch((err) => {
                console.error("Failed to copy text: ", err);
              });
          }}
        >
          <CopyAll />
        </Button>
      </Box>
      <Link to={`/room/${roomId}`}>
        <Button variant="contained">
          <VideoCallOutlined color="info" />
          <Typography color="white">Join Call</Typography>
        </Button>
      </Link>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Copied to clipboard!"
      />
    </Box>
  );
};

export default function Dashboard() {

  const { setCurrentUser } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", width: "100%" }}>
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
            fontFamily="Poppins"
            fontSize={"1.5rem"}
            color={"primary"}
            fontWeight={"bold"}
          >
            MeetGaze
          </Typography>
          <Button variant="outlined" onClick={async () => {await signOutFromApp(); setCurrentUser!(null);}} startIcon={<ExitToApp />}>SignOut</Button>
        </Toolbar>
      </AppBar>
        <CssBaseline />
        <MainContent />
      </Box>
    </ThemeProvider>
  );
}
