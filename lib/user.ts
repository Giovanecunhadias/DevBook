
import { compareSync } from "bcryptjs";
import db from "./db";

export type User = {
    name: string;
    phone: string;
    password?: string;
    email: string;
    emailVerified: boolean;
}

export async function findUserByCredentials(email: string, password: string): Promise<User | null> {
    const user = await db.user.findFirst({
        where: {
            email: email,
        }
    });

    if (!user) {
        return null;
    }

    const passwordMatch = compareSync(password, user.password);
    if (passwordMatch) {
        return {
            email: user.email,
            name: user.name ?? '',
            phone: user.phone ?? '',
            emailVerified: user.emailVerified
        };
    }
    return null;
}