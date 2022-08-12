import { Document } from 'dynamoose/dist/Document';

export class IdentifiableDocument extends Document {
  id = '';
}

export class DocumentWithTenant extends IdentifiableDocument {
  tenantId = '';
}
