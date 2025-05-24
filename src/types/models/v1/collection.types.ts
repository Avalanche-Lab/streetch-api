export interface CollectionModel {
    id: number;
    title: string;
    profileIcon: string;
    description: string;
    typeCollection: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateCollectionModel = Omit<CollectionModel, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
};


