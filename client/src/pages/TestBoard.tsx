import { Box, Button, Typography } from "@mui/material";
import { auth } from "../firebase.config";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

type ConnectionStatus = "Connected" | "Disconnected" | "Idle";

function useSocketIO() {
  const [connection, setConnection] = useState<Socket>();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("Idle");
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    auth.currentUser?.getIdToken().then((token) => {
      const socket = io("http://localhost:3000/relay", {
				withCredentials: true,
				auth: {
					token
				},
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("Connected to server");
        setConnectionStatus("Connected");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
        setConnectionStatus("Disconnected");
      });

      socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
        setErr(error.message || "Connection error");
      });

      setConnection(socket);
    }).catch((error) => {
      console.error("Error getting token:", error);
      setErr("Error getting token");
    });

    // Cleanup on unmount
    return () => {
      connection?.disconnect();
    };
  }, []);

  return { err, connection, connectionStatus };
}

export default function TestBoard() {
  const { err, connection, connectionStatus } = useSocketIO();

	function handleMessageSend() {
		connection?.send("message", {data: "What's up?"});
	}

  return (
    <Box>
      <Typography>Error: {err}</Typography>
      <Typography>Status: {connectionStatus}</Typography>
			<Button onClick={() => handleMessageSend()}>SendMessage</Button>
    </Box>
  );
}