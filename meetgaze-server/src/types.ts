import { Request } from "express";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Socket } from "socket.io";

export type RequestWithUser = Request & { user: DecodedIdToken };

export type SocketWithUser =  Socket & {user?: DecodedIdToken }