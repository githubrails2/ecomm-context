import { useEffect, useState } from "react";

import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		runFireworks();
	}, []);
	return (
		<div className="success-wrapper">
			<div className="success">
				<p className="icon">
					<BsBagCheckFill />
				</p>
				<h2>Thank you for your order!</h2>
				<p className="email-msg">Check your email for the receipt</p>
				<p className="description">
					if you have any questions, please email
					<a className="email" href="mailto:order@example.com">
						order@example.com
					</a>
					<Link href="/">
						<button width="300px" className="btn">
							Continue Shopping
						</button>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Success;
