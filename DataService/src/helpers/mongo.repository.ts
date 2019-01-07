import {Collection, MongoClient, UpdateQuery, ObjectId} from 'mongodb';
import {injectable, unmanaged} from 'inversify';
import { config } from '@astra/common';
import {PaginationDto} from '../../../Common/src/dto';
import {PaginatedResponse} from '../../../Common/src/interfaces';

@injectable()
export abstract class MongoRepository<T> {
    private collection: Collection;
    private readonly MappingType: { new(...args): T };

    protected constructor(
        @unmanaged() client: MongoClient,
        @unmanaged() collectionName: string,
        @unmanaged() MappingType: { new(...args): T }
    ) {
        this.MappingType = MappingType;
        this.initData(client, collectionName);
    }

    public async find(query: object): Promise<T[]> {
        const data = await this.collection.find(query).toArray();
        return data.map(item => Reflect.construct(this.MappingType, [item]));
    }

    public async findById(id: string): Promise<T | undefined> {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    public async findOne(query: object): Promise<T | undefined> {
        const data = await this.collection.findOne(query);

        if(data) {
            return Reflect.construct(this.MappingType, [data]);
        }
    }

    public async save(entity: Partial<T>): Promise<T> {
        if(!(entity instanceof this.MappingType)) {
            throw new Error('Entity should be an instance of model');
        }


        const { insertedId } = await this.collection.insertOne(entity);
        const rawData = await this.collection.findOne({ _id: insertedId });
        console.log(rawData);

        return Reflect.construct(this.MappingType, [rawData]);
    }

    public async updateById(id: string, entity: UpdateQuery<T>): Promise<T | undefined> {
        return await this.updateOne({ _id: new ObjectId(id) }, entity);
    }

    public async updateOne(query: object, entity: UpdateQuery<T>): Promise<T | undefined> {
        await this.collection.updateMany(query, entity);
        const rawData = await this.collection.findOne(query);

        if(rawData) {
            return Reflect.construct(this.MappingType, [rawData]);
        }
    }

    public async update(query: object, entity: UpdateQuery<T>): Promise<T[]> {

        await this.collection.updateMany(query, entity);
        const rawData = await this.collection.find(query).toArray();

        return rawData.map(item => Reflect.construct(this.MappingType, [item]));
    }

    public async delete(query: object): Promise<void> {
        await this.collection
            .deleteMany(query);
    }

    public async deleteById(id: string): Promise<void> {
        await this.collection
          .deleteOne({ _id: new ObjectId(id) });
    }

    private async initData(client: MongoClient, collectionName: string) {
        const connectedClient = await client.connect();
        this.collection = connectedClient.db(config.DataService.database.database).collection(collectionName);
    }

    public async findManyWithPagination(query: object,  { page, limit }: Required<PaginationDto>): Promise<PaginatedResponse<T>> {

        const mongoQuery = this.collection.find(query).skip((page - 1) * limit ).limit(limit);

        const rawData = await mongoQuery.toArray();
        const totalCount = await this.collection.count(query);

        return {
            page,
            data: rawData.map(item => Reflect.construct(this.MappingType, [item])),
            itemsPerPage: limit,
            totalCount
        }
    }

}