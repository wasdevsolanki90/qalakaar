import * as bcrypt from 'bcrypt';

export async function passwordHasher(password:string):Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function bcryptCompare(password:string, hash:string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}