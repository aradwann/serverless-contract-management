import { contractService } from '../src/services'


describe('Contract service', () => {


    test('create contract', async () => {
        const contract = {
            contractId: "a34823c4-e074-4e67-bedd-6f39402f4edf",
            name: "test new contract name",
            templateId: "a34823c4-e074-4e67-bedd-6f39402f4edf",
            userId: "a34823c4-e074-4e67-bedd-6f39402f4edf"
        }
        const newContract = await contractService.createContract(contract)
        expect(newContract).toEqual(contract)
    });

    test('get contract', async () => {
        const contractId = '1ccc6342-096a-4398-9ce6-f71a558b4b30';
        const contractInDb = {
            contractId: '1ccc6342-096a-4398-9ce6-f71a558b4b30',
            name: "test contract name",
            templateId: "a34823c4-e074-4e67-bedd-6f39402f4edf",
            userId: "a34823c4-e074-4e67-bedd-6f39402f4edf"
        }
        const contract = await contractService.getContract(contractId)
        expect(contract).toEqual(contractInDb)
    });

    test('get all contracts Ids', async () => {
        const contractsIds = await contractService.getAllContractIds();

        expect(contractsIds).toContainEqual({ contractId: '1ccc6342-096a-4398-9ce6-f71a558b4b30' })
    });
});

