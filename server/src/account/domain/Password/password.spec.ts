import { describe, it, expect } from 'vitest'
import Account from '../Account'
import { PBKDF2Password } from '.'


describe('Number One', () => {
    it('Number Two', () => {
        const myAccount = Account.create('Matheus Eduardo', 'matheus.eai@gmail.com', true, 'gioiella')

        console.log(myAccount)

        const test2 = PBKDF2Password.restore(
            '5e053eb30846a7e9bee567892958117d5beeae0b0535cd225cc1da60c4a0006580e28fbcbad048196edf1457ee35dc68d023b8265256afc86badf23b9fb51b89',
            'f252bb0e7519dc3f7a1e676652621ced115b1500'

        ).validate('gioiella')

        console.log(test2)



        expect(myAccount.password.validate('gioiella')).toBe(true)
    })
})