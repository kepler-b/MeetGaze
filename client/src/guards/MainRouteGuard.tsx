import React, { useEffect } from "react";
import { AuthLoadStatus, useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";

export default function MainRouteGuard({
  children,
  DefaultComponent,
}: {
  children: React.ReactNode;
  DefaultComponent: React.ComponentType;
}) {
  const { user, loaded } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.displayName) {
      navigate("/setup");
    }
  }, [user]);

  if (!user && loaded === AuthLoadStatus.LOADING) {
    return (
      <>
        <LinearProgress color="warning" />
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography fontWeight="bold" sx={{ opacity: "0.8" }}>
            Checking Authentication Status
          </Typography>
        </Box>
      </>
    );
  }

  return <>{user ? children : <DefaultComponent />}</>;
}
