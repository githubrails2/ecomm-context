import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
	const { showCart, setShowCart, totalQuantities } = useStateContext();
	return (
		<div className="navbar-container">
			<p className="logo">
				<Link href="/">Stuff</Link>
			</p>
			<button className="cart-icon" onClick={() => setShowCart(true)}>
				<AiOutlineShopping />
				<span className="cart-item-qty">{totalQuantities}</span>
			</button>
			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;