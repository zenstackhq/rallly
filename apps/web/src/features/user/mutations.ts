import { db, type ModelTypes } from '@rallly/database';

export async function createUser({
    name,
    email,
    emailVerified,
    image,
    timeZone,
    timeFormat,
    locale,
    weekStart,
}: {
    name: string;
    email: string;
    emailVerified?: boolean;
    image?: string;
    timeZone?: string;
    timeFormat?: ModelTypes.TimeFormat;
    locale?: string;
    weekStart?: number;
}) {
    const user = await db.user.create({
        data: {
            name,
            email,
            emailVerified,
            image,
            timeZone,
            timeFormat,
            locale,
            weekStart,
            role: 'user',
        },
    });

    return user;
}

export async function setActiveSpace({
    userId,
    spaceId,
}: {
    userId: string;
    spaceId: string;
}) {
    return await db.spaceMember.update({
        where: {
            spaceId_userId: {
                spaceId: spaceId,
                userId: userId,
            },
        },
        data: {
            lastSelectedAt: new Date(),
        },
    });
}
