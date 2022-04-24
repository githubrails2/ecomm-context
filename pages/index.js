import { FooterBanner, HeroBanner, Product } from "./components";

import { client } from "./lib/client";

const Home = ({ products, bannerdata }) => {
	return (
		<>
			<HeroBanner heroBanner={bannerdata.length && bannerdata[0]} />

			<div className="products-heading">
				<h2>Best Selling Products</h2>
				<p>Speakers etc</p>
			</div>
			<div className="products-container">
				{products?.map((product) => (
					<Product product={product} key={product._id} />
				))}
			</div>
			<FooterBanner footerBanner={bannerdata && bannerdata[0]} />
		</>
	);
};

export default Home;
export const getServerSideProps = async () => {
	const query = '*[_type=="product"]';
	const products = await client.fetch(query);

	const bannerQuery = '*[_type=="banner"]';
	const bannerdata = await client.fetch(bannerQuery);

	return {
		props: {
			products,
			bannerdata,
		},
	};
};
