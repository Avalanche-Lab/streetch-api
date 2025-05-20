import { Request, Response } from 'express';
import { StatusCode } from '@/constants/status-code.constants';
import { catchAsync } from '@/utils/catch-async.utils';
import CollectionService from '@/services/v1/collection.service';

export class CollectionController {
    create = catchAsync(async (req: Request, res: Response) => {
        const { title, description, typeCollection, profileIcon } = req.body;

        const collection = await CollectionService.create({
            title,
            description,
            typeCollection,
            profileIcon
        });

        res.status(StatusCode.OK).json(collection);
    });
}

export default new CollectionController();
