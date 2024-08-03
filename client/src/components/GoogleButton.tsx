import { Button } from "@mui/material";
import { MouseEventHandler } from "react";
import GoogleIcon from "../assets/google-logo.svg";

type TGoogleButtonProps = {
    title: string,
    handle: MouseEventHandler<HTMLButtonElement>
}
export function GoogleButton({ title, handle }: TGoogleButtonProps) {
  return (
    <>
      <Button
        variant="contained"
        fullWidth
        style={{
          cursor: "pointer",
          backgroundColor: "#ffffff24",
          color: "white",
          textTransform: "none",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
        startIcon={<img alt="google logo" src={GoogleIcon} width={28} height={28} />} // Optional: Add a Google logo to the button
        onClick={handle}
      >
        {title}
      </Button>
    </>
  );
}
