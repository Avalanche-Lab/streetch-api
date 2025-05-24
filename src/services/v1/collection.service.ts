import { CreateCollectionModel } from "@/types/models/v1/collection.types";
import { Base64FileUpload, FileUploadResponse } from "@/types/models/v1/file.types";
import CollectionRepository from "@/repositories/v1/collection.repository";
import { FileUtils } from "@/utils/file.utils";

export class CollectionService {
    async create(data: Omit<CreateCollectionModel, 'profileIcon'> & { file: Base64FileUpload }) {
        const fileUploadResponse = await FileUtils.saveBase64File(data.file);
        
        const collectionData: CreateCollectionModel = {
            ...data,
            profileIcon: fileUploadResponse.path
        };

        const collection = await CollectionRepository.create(collectionData);
        
        return {
            ...collection,
            fileInfo: fileUploadResponse
        };
    }

    async delete(id: number) {
        const collection = await CollectionRepository.findById(id);
        
        if (collection?.profileIcon) {
            await FileUtils.deleteFile(collection.profileIcon);
        }

        return await CollectionRepository.delete(id);
    }
}

export default new CollectionService();
