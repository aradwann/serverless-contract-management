
export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    templateId: { type: 'string' },
    userId: { type: 'string' }

  },
  required: ['name', 'templateId', 'userId']
}as const;
