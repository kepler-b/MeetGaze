import { ExtendedError } from "socket.io/dist/namespace";
import { AuthService } from "../service/auth.service";
import { SocketWithUser } from "../types";


class UnauthorizedException extends Error {
    public statusCode: number;
    public details: string;

    constructor(message: string = "Unauthorized access", details?: string) {
        super(message);
        this.name = "UnauthorizedException";
        this.statusCode = 401;
        this.details = details || '';

        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}

export default UnauthorizedException;

export async function authMiddleware(socket: SocketWithUser, next: (err?: ExtendedError) => void) {
    const authService = AuthService.getInstance();
    const token = socket.handshake.auth.token;

    if (!token) {
        next(new UnauthorizedException());
    }

    const result = await authService.verifyToken(token);

    socket.user = result;

    next();
}