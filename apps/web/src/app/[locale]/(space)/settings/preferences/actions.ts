'use server';

import { db } from '@rallly/database';

import { getUserIdIfLoggedIn } from '@/lib/auth';

export async function updateLocale(locale: string) {
    const userId = await getUserIdIfLoggedIn();
    if (!userId) {
        throw new Error('User not found');
    }
    await db.user.update({
        where: {
            id: userId,
        },
        data: {
            locale,
        },
    });
}
