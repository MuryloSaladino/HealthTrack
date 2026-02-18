export enum Routes {
    NOT_FOUND = "*",

    LOGIN = "/",
    REGISTER = "/register",
    
    HOME = "/u/:userId",
    BOARD = "/w/:workspaceId/b/:boardId",

    BOARD_CARD = "/w/:workspaceId/b/:boardId/c/:cardId"
}