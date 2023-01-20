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
    ],
    basePort: 8000,
};