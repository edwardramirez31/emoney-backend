/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import CRUDRepository from 'src/repositories';
import { Schema } from 'ajv';
import { apiGwProxy } from 'src/decorators/apiGatewayProxy';
import { crateValidator } from 'src/validators/create-validator';
import * as uuid from 'uuid';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Schema as DynamoSchema } from 'dynamoose/dist/Schema';
import { Document } from 'dynamoose/dist/Document';
import { responseGenerator } from 'src/utils/responseGenerator';
import HttpStatusCode from 'src/utils/types';

export default class CRUDController<T extends Document> {
  private repository: CRUDRepository<T>;
  private validatorSchema: Schema;
  private entityName: string;

  constructor(validatorSchema: Schema, tableName: string, schema: DynamoSchema) {
    this.repository = new CRUDRepository<T>(tableName, schema);
    this.validatorSchema = validatorSchema;
    this.entityName = tableName;
  }

  create = (): APIGatewayProxyHandler =>
    apiGwProxy<Partial<T>>({
      validator: crateValidator(this.validatorSchema),
      handler: async (event) => {
        const body = event.body!;
        const tenantId = event.requestContext.authorizer?.jwt.claims.sub ?? '';

        const object = await this.repository.create({ id: uuid.v4(), tenantId, ...body });

        return responseGenerator({ statusCode: HttpStatusCode.CREATED, body: { ...object.toJSON() } });
      }
    });

  update = (): APIGatewayProxyHandler =>
    apiGwProxy<Partial<T>>({
      validator: crateValidator(this.validatorSchema),
      handler: async (event) => {
        const body = event.body!;
        const { id } = event.pathParameters!;
        const tenantId = event.requestContext.authorizer?.jwt.claims.sub ?? '';

        const object = await this.repository.update({ ...body }, { id: id ?? '', tenantId });

        return responseGenerator({ statusCode: HttpStatusCode.OK, body: { ...object.toJSON() } });
      }
    });

  getById = (): APIGatewayProxyHandler =>
    apiGwProxy({
      handler: async (event) => {
        const { id } = event.pathParameters!;
        const tenantId = event.requestContext.authorizer?.jwt.claims.sub ?? '';

        const object = await this.repository.getById(id ?? '', tenantId);

        if (!object) {
          return responseGenerator({
            statusCode: HttpStatusCode.NOT_FOUND,
            body: { success: false, message: `${this.entityName} not found` }
          });
        }

        return responseGenerator({ statusCode: HttpStatusCode.OK, body: { ...object.toJSON() } });
      }
    });

  scanByTenantId = (): APIGatewayProxyHandler =>
    apiGwProxy({
      handler: async (event) => {
        const tenantId = event.requestContext.authorizer?.jwt.claims.sub ?? '';

        const objects = await this.repository.getByTenantId(tenantId);

        return responseGenerator({ statusCode: HttpStatusCode.OK, body: { items: objects } });
      }
    });

  delete = (): APIGatewayProxyHandler =>
    apiGwProxy({
      handler: async (event) => {
        const tenantId = event.requestContext.authorizer?.jwt.claims.sub ?? '';

        const { id } = event.pathParameters!;

        await this.repository.deleteById(id ?? '', tenantId);

        return responseGenerator({ statusCode: HttpStatusCode.OK, body: { success: true } });
      }
    });

  public set setRepository(newRepository: CRUDRepository<T>) {
    this.repository = newRepository;
  }
}
