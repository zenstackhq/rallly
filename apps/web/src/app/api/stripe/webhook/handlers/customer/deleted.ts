import type { Stripe } from '@rallly/billing';
import { db } from '@rallly/database';

export async function onCustomerDeleted(event: Stripe.Event) {
    const customer = event.data.object as Stripe.Customer;

    // Find and update the user with this customerId
    await db.user.updateMany({
        where: {
            customerId: customer.id,
        },
        data: {
            customerId: null,
        },
    });
}
