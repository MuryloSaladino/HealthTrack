export interface IBoard {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    color: string
    workspaceId: string
}

export interface IBoardCreation {
    name: string
    color?: string
    workspaceId: string
}
