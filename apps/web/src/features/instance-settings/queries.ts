import 'server-only';

import { db } from '@rallly/database';
import { unstable_cache } from 'next/cache';
import { instanceSettingsTag } from './constants';

export const getInstanceSettings = unstable_cache(
    async () => {
        const instanceSettings = await db.instanceSettings.findUnique({
            where: {
                id: 1,
            },
            select: {
                disableUserRegistration: true,
            },
        });

        return {
            disableUserRegistration:
                instanceSettings?.disableUserRegistration ?? false,
        };
    },
    [],
    {
        tags: [instanceSettingsTag],
    }
);
