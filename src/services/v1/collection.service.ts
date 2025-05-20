import { CreateCollectionModel } from "@/types/models/v1/collection.types";
import CollectionRepository from "@/repositories/v1/collection.repository";

export class CollectionService {
     async create(data: CreateCollectionModel) {
        const collection = await CollectionRepository.create(data);
        
        return collection;
    }
}

export default new CollectionService();
