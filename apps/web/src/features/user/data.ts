import type { UserDTO } from '@/features/user/schema';
import { db, type ModelTypes } from '@rallly/database';
import { cache } from 'react';

export const createUserDTO = (user: ModelTypes.User): UserDTO => ({
    id: user.id,
    name: user.name,
    image: user.image ?? undefined,
    email: user.email,
    role: user.role,
    timeZone: user.timeZone ?? undefined,
    timeFormat: user.timeFormat ?? undefined,
    locale: user.locale ?? undefined,
    weekStart: user.weekStart ?? undefined,
    customerId: user.customerId ?? undefined,
    isGuest: false,
});

export const getUser = cache(async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id,
        },
    });

    if (!user) {
        return null;
    }

    return createUserDTO(user);
});
