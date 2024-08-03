import {
  Box,
  Button,
  createTheme,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import BlurContainer from "../components/BlurContainer";
import InputField from "../components/InputField";
import { useState } from "react";
import { GoogleButton } from "../components/GoogleButton";
import {
  authenticateWithGoogle,
  loginWithEmail,
  useAuth,
} from "../contexts/AuthContext";
import LoginPageGuard from "../guards/LoginPageGuard";

const theme = createTheme({
  palette: {
    primary: { main: "#fff" },
    secondary: { main: "rgb(65, 53, 202)" },
  },
});

function checkEmail(email: string) {
  if (email === "") {
    alert("Enter email please");
    return false;
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert("Enter Correct email");
    return false;
  }

  return true;
}

function checkPassword(password: string) {
  if (password.length < 8) {
    alert("Length of password should be 8");
    return false;
  }
  return true;
}

enum InputFieldCheckType {
  PASSWORD,
  EMAIl,
}

function check(value: string, type: InputFieldCheckType) {
  switch (type) {
    case InputFieldCheckType.EMAIl:
      return checkEmail(value);
    case InputFieldCheckType.PASSWORD:
      return checkPassword(value);
  }
}

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useAuth();

  async function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !check(email, InputFieldCheckType.EMAIl) &&
      !check(password, InputFieldCheckType.PASSWORD)
    )
      return;
    const cred = await loginWithEmail(email, password);
    console.assert(setCurrentUser, "Local user couldn't be set");
    setCurrentUser && setCurrentUser(cred.user);
  }

  return (
    <LoginPageGuard>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            background: "#14162E",
            overflow: "scroll",
          }}
        >
          <BlurContainer />
          <Stack
            sx={{
              maxWidth: "400px",
              position: {
                md: "static",
              },
              top: "0",
              alignItems: "center",
              marginY: { xs: 2, md: 4 },
              paddingY: {
                xs: 8,
                md: 4,
              },
              marginX: "auto",
              background: "rgba(255,255,255, 0.0)",
              backdropFilter: "blur(5px)",
              border: "1px solid #ffffff02",
              boxSizing: "border-box",
              borderRadius: {
                xs: 0,
                md: 4,
              },
              boxShadow: "0 0 12px 2px rgba(0,0,0, 0.2)",
              zIndex: "1",
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              color="#fff"
            >
              MeetGaze
            </Typography>
            <Typography
              variant="body1"
              component="h1"
              fontWeight="bold"
              color="#fff"
              marginTop={"12px"}
            >
              Login
            </Typography>

            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              sx={{
                width: "calc(100% - 20px)",
              }}
            >
              <Box sx={{ width: "100%", marginTop: "24px", color: "white" }}>
                <form
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onSubmit={(e) => handleEmailLogin(e)}
                >
                  <InputField
                    label="Email: "
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <InputField
                    label="Password: "
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      width: "calc(100% - 60px)",
                      marginTop: "24px",
                      transition: "0.2s",
                      "&:active": {
                        scale: "0.95",
                      },
                    }}
                    type="submit"
                  >
                    Login
                  </Button>
                  <Box
                    sx={{
                      margin: "12px 0",
                      borderRadius: "50%",
                      padding: "4px",
                      aspectRatio: "1 / 1",
                      textAlign: "center",
                      userSelect: "none",
                      scale: "0.8",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={"bold"}
                      component="span"
                    >
                      OR
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "calc(100% - 60px)",
                      transition: "0.2s",
                      "&:active": {
                        scale: "0.95",
                      },
                    }}
                  >
                    <GoogleButton
                      title="SignIn With Google"
                      handle={() => authenticateWithGoogle()}
                    />
                  </Box>
                  <Box height={"80px"} />
                </form>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </LoginPageGuard>
  );
}
