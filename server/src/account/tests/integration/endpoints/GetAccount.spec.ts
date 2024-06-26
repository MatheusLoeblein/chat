import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import { MongoDbAdapter } from '../../../../infra/database/MongoDbAdapter';
import { AppTest } from '../../../../app';
import { AccountRepositoryNoSql } from '../../../../infra/repository/AccountRepositoryNoSql';
import axios from 'axios';
import Account from '../../../domain/Account';
import { JWTService } from '../../../../services/jsonWebToken';

describe('SignUp Intergration test', () => {
    let App: AppTest;
    let port: number = 7456
    let account: Account
    let token: string

    beforeAll(async () => {
        const connection = new MongoDbAdapter();
        const accountRepository = new AccountRepositoryNoSql(connection);

        account = Account.create('Matheus', 'Matheus Eduardo', 'matheus@ttest.com', true, '123456',)
        await accountRepository.save(account)

        token = JWTService.sign({ accountId: account.accountId, name: account.name.getValue(), cover: account.cover })

        App = new AppTest()
        await App.start(port)
    })

    test('Should return account data in private Route with authentication', async () => {


        const response = await axios.get(`http://localhost:${port}/accounts/${account.accountId}`,
            { headers: { Authorization: token } }).catch(e => console.log(e))


        expect(response.status).toBe(200)

    })

    afterAll(async () => {
        await App.close()
    })
})