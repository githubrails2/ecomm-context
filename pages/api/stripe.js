import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const params = {
				submit_type: "pay",
				payment_method_types: ["card"],
				billing_address_collection: "auto",
				shipping_options: [
					{
						shipping_rate: "shr_1Ks4qfJIJycQ8Om9Xn3iA7Q8",
					},
				],
				line_items: req.body.map((item) => {
					{
						/*const img = item.image[0].asset.ref;
                    console.log(item.image[0].asset.ref);
                    debugger;
                    const newImage = img
                        .replace(
                            "image-",
                            "https://cdn.sanity.io/images/fv9jcn5o/production/"
                        )
                        .replace("-webp", ".webp");*/
					}
					return {
						price_data: {
							currency: "usd",
							product_data: {
								name: item.name,
							},
							unit_amount: item.price * 100,
						},
						adjustable_quantity: {
							enabled: true,
							minimum: 1,
						},
						quantity: item.quantity,
					};
				}),
				mode: "payment",
				success_url: `${req.headers.origin}/?sucess=true`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
			};
			const session = await stripe.checkout.sessions.create(params);
			res.status(200).json(session);
		} catch (error) {
			res.status(500).json({ statusCode: 500, message: error.message });
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
