// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const { Notification, Message } = initSchema(schema);

export { Notification, Message };
