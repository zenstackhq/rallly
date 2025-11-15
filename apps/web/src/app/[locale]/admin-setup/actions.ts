'use server';

import { db } from '@rallly/database';
import { redirect } from 'next/navigation';
import { AppError } from '@/lib/errors';
import { authActionClient } from '@/lib/safe-action/server';
import { isInitialAdmin } from '@/utils/is-initial-admin';

export const makeMeAdminAction = authActionClient
    .metadata({ actionName: 'make_admin' })
    .action(async ({ ctx }) => {
        if (!isInitialAdmin(ctx.user.email)) {
            throw new AppError({
                code: 'FORBIDDEN',
                message: 'You are not authorized to update your role',
            });
        }

        await db.user.update({
            where: {
                id: ctx.user.id,
            },
            data: {
                role: 'admin',
            },
        });

        redirect('/control-panel');
    });
