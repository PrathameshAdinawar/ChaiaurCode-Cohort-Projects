
import {randomBytes,createHmac} from 'node:crypto'
import {db,eq} from '@repo/database'
import {usersTable} from '@repo/database/models/user'
import {createUserWithEmailAndPasswordInput, type CreateUserWithEmailAndPasswordInput} from './model'

class UserService{

    private async getUserByEmail(email:string){
        const result = await db.select().from(usersTable).where(eq(usersTable.email,email))

        if(!result || result.length === 0) return null
        return result[0] 
    }

    public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInput){
        const {fullName,email,password} = await createUserWithEmailAndPasswordInput.parseAsync(payload)

        //check if user already exists or not
        const existingUserWithEmail = await this.getUserByEmail(email)
        if(existingUserWithEmail) throw new Error(`user with email ${email} already exists`)

        const salt = randomBytes(16).toString('hex')
        const hash = createHmac('sha256',salt).update(password).digest('hex')

        await db.insert(usersTable).values({email,fullName})
    }
}

export default UserService