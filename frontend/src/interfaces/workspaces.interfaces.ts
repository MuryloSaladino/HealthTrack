import { IBoard } from "./boards.interfaces"

export interface IWorkspace {
    id: string
	createdAt: string
	updatedAt: string
    name: string
    ownerId: string
    boards?: IBoard[]
}

export interface IWorkspaceCreation {
    name: string
}