
export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    templateId: { type: 'string', format: 'uuid' },
    userId: { type: 'string', format: 'uuid' }

  },
  required: ['name', 'templateId', 'userId']
} as const;
