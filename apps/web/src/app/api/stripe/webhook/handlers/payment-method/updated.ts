import type { Stripe } from '@rallly/billing';
import { db, type JsonObject } from '@rallly/database';

export async function onPaymentMethodUpdated(event: Stripe.Event) {
    const paymentMethod = event.data.object as Stripe.PaymentMethod;

    if (!paymentMethod.customer) {
        return;
    }

    // Update the payment method data in our database
    await db.paymentMethod.update({
        where: {
            id: paymentMethod.id,
        },
        data: {
            type: paymentMethod.type,
            data: paymentMethod[paymentMethod.type] as JsonObject,
        },
    });
}
