import type { Stripe } from '@rallly/billing';
import { db } from '@rallly/database';

export async function onPaymentMethodDetached(event: Stripe.Event) {
    const paymentMethod = event.data.object as Stripe.PaymentMethod;

    // Delete the payment method from our database
    await db.paymentMethod.delete({
        where: {
            id: paymentMethod.id,
        },
    });
}
