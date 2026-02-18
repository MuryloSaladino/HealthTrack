export interface ICardList {
    id: string
    createdAt: string
    updatedAt: string
    boardId: string
    name: string
    color: string
    cards: ICard[]
}

export interface ICard {
    id: string
    createdAt: string
    updatedAt: string
    cardListId: string
    description: string
    detailedDescription: string
    startDate: string
    finishDate: string
}

export interface ICardWithDetails extends ICard {
    participations: IParticipation[]
}

export interface IParticipation {
    createdAt: string
    updatedAt: string
    userId: string
    cardId: string
    user: {
        id: string
        createdAt: string
        updatedAt: string
        email: string
    }
}
