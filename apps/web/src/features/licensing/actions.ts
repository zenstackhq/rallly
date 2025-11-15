'use server';

import { db } from '@rallly/database';
import { adminActionClient } from '@/lib/safe-action/server';

export const removeInstanceLicenseAction = adminActionClient
    .metadata({
        actionName: 'remove_instance_license',
    })
    .action(async () => {
        try {
            await db.instanceLicense.deleteMany();
        } catch (_error) {
            return {
                success: false,
                message: 'Failed to delete license',
            };
        }

        return {
            success: true,
            message: 'License deleted successfully',
        };
    });
