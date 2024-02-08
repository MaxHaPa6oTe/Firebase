import Chat from "./components/Chat";
import Login from "./components/Login";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/config";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Comment: Login
    }
]

export const privatRoutes = [
    {
        path: CHAT_ROUTE,
        Comment: Chat
    }
]