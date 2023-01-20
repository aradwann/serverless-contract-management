module.exports = {
    tables: [
        {
            TableName: "UsersTable",
            KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
            AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
            data: [
                {
                    userId: '1ccc6342-096a-4398-9ce6-f71a558b4b30',
                    username: 'user1',
                    password: '$2a$10$13IJyE2YGF1TG01h2Mly0u.QfNgJ8gKhee1GqgUWw0JJKjaBQo5/y'
                },
            ],
        },
        {
            TableName: "ContractsTable",
            KeySchema: [{ AttributeName: "contractId", KeyType: "HASH" }],
            AttributeDefinitions: [{ AttributeName: "contractId", AttributeType: "S" }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
            data: [
                {
                    contractId: '1ccc6342-096a-4398-9ce6-f71a558b4b30',
                    name: "test contract name",
                    templateId: "a34823c4-e074-4e67-bedd-6f39402f4edf",
                    userId: "a34823c4-e074-4e67-bedd-6f39402f4edf"
                },
            ],
        },
    ],
    basePort: 8000,
};