export const schema = {
  models: {
    Notification: {
      name: 'Notification',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        receiver_id: {
          name: 'receiver_id',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        content: {
          name: 'content',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        target_type: {
          name: 'target_type',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        target_id: {
          name: 'target_id',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: true,
          attributes: [],
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: true,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: 'Notifications',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'key',
          properties: {
            name: 'SortByCreatedAt',
            fields: ['createdAt'],
            queryField: 'NotificationSortedByCreatedAt',
          },
        },
        {
          type: 'aws_cognito_user_pools',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                allow: 'private',
                provider: 'userPools',
                operations: ['read', 'create'],
              },
            ],
          },
        },
      ],
    },
    Message: {
      name: 'Message',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        user_id: {
          name: 'user_id',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        room_id: {
          name: 'room_id',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        text: {
          name: 'text',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        image: {
          name: 'image',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        owner: {
          name: 'owner',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        view: {
          name: 'view',
          isArray: false,
          type: 'Int',
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: true,
          attributes: [],
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: true,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: 'Messages',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'key',
          properties: {
            name: 'messagesByDate',
            fields: ['room_id', 'createdAt'],
            queryField: 'messagesByDate',
          },
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                operations: ['read', 'create'],
                identityClaim: 'cognito:username',
              },
              {
                allow: 'private',
                provider: 'userPools',
                operations: ['read'],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: 'f5f40ed67d8d0fb8e7e0f178bbb0330a',
};
