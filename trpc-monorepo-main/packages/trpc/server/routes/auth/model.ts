import {z} from 'zod'

export const createUserEmailAndPasswordInputModel=z.object({
    fullName:z.string().describe('name of the user'),
    email:z.email().describe('Email of the user'),
    password:z.string().describe('password of the user')

})

export const createUserWithEmailAndPasswordOuputModel = z.object({
    id:z.string().describe('id of the user created')
})