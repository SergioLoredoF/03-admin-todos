'use server';

import { CredentialsSignin } from 'next-auth';
import bcrypt from 'bcryptjs';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

class ErrorNoCredentials extends CredentialsSignin {
    code = 'Ingresar sus credenciales' 
}

class CredencialesIncorrectas extends CredentialsSignin {
    code = 'Las credenciales son incorrectas' 
}

const createUser = async( email: string, pass: string) => {

    const user = await prisma.user.create({
        data: {
            email: email,
            password: bcrypt.hashSync(pass),
            name: email.split('@')[0]
        }
    });

    return user;
}

export const signInEmailPassword = async ( email: string, pass: string) => {
   
    if( !email || !pass ) throw new ErrorNoCredentials();

    const user = await prisma.user.findUnique({ where: { email } });

    if( !user ) {
        const dbUser = await createUser( email, pass );
        return dbUser;
    }

    if( !bcrypt.compareSync( pass, user.password ?? '' ) ) throw new CredencialesIncorrectas();

    return user;
}

export const getUserServerSession = async () => {
    const session = await auth();
    return session?.user
}

