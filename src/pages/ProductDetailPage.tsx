import { useState } from 'react';
import Layout from '../components/Layout';
import ProductDetail from '../components/ProductDetail';
import SimilarProducts from '../components/SimilarProducts';

type Props = {};
export default function ProductDetailPage({}: Props) {
	const [productInfo, setProductInfo] = useState({
		category: '',
		id: '',
	});
	const passCategoryHandler = (category: string, id: string) => {
		setProductInfo({
			category: category,
			id: id,
		});
	};
	return (
		<Layout>
			<ProductDetail passCategory={passCategoryHandler} />
			<SimilarProducts category={productInfo.category} id={productInfo.id} />
		</Layout>
	);
}
