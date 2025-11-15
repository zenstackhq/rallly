import { db } from '@rallly/database';

export const userHasSpaces = async (userId: string): Promise<boolean> => {
    const spaceCount = await db.spaceMember.count({
        where: {
            userId: userId,
        },
    });
    return spaceCount > 0;
};
