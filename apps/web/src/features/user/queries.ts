import { db } from '@rallly/database';

export const getUserCount = async () => {
    return await db.user.count();
};

export const getUserHasPassword = async (userId: string) => {
    const account = await db.account.findFirst({
        where: {
            userId,
            provider: 'credential',
        },
    });
    return !!account;
};

export const getUserHasNoAccounts = async (userId: string) => {
    const accountCount = await db.account.count({
        where: {
            userId,
        },
    });
    return accountCount === 0;
};
