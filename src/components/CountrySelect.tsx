import { DetailedHTMLProps, useEffect, useState } from 'react';
import { useShoppingCart } from '../context/WDS/ShoppingCartContext';
import currencySymbol from '../data/CurrencySymbols';

type Props = {
	styleClasses?: string;
	getSelectedValue?(val: string): void;
	options: string[];
} & DetailedHTMLProps<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
>;
export default function CountrySelect({
	styleClasses,
	getSelectedValue,
	options,
	...otherProps
}: Props) {
	const { changeBasePrice } = useShoppingCart();
	const [selectedCurr, setSelectedCurr] = useState('usd');
	const currencySelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		const selectedCurrConst = e.target.value.toLowerCase();

		setSelectedCurr(selectedCurrConst);
		changeBasePrice(selectedCurrConst);
	};
	useEffect(() => {
		// changeBasePrice(selectedCurr);
		if (getSelectedValue) getSelectedValue(selectedCurr);
	}, [selectedCurr]);
	const styles = `select text-md rounded-none outline-none focus:outline-2 bg-transparent ${
		styleClasses ? styleClasses : ''
	}`;
	return (
		<select
			onChange={currencySelectHandler}
			id='countrySelect'
			className={styles}
			{...otherProps}>
			{options.map((currency, i) => (
				<option key={i} value={currency}>
					{currency}
				</option>
			))}
			{/* {productsBrands.map((brand, i) => (
							<option key={i} value={brand}>
								{brand}
							</option>
						))} */}
		</select>
	);
}
