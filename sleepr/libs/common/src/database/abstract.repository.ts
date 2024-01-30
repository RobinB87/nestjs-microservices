import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    // use lean(true) to basically remove any mongoose helper stuff and just return the pojo
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    return this.returnDocumentOrThrowAndLog(document, filterQuery);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    // by default you get the 'prior' object back; 'new: true' ensures we get the object after saving back
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);

    return this.returnDocumentOrThrowAndLog(document, filterQuery);
  }

  findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }

  private returnDocumentOrThrowAndLog(
    document: TDocument,
    filterQuery: FilterQuery<TDocument>,
  ) {
    if (document) return document;

    this.logger.warn('Document was not found with filterQuery: ', filterQuery);
    throw new NotFoundException('Document was not found');
  }
}
