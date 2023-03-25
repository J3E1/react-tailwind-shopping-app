import currencySymbol from '../src/data/CurrencySymbols';

export default function getCurrencySymbol(code: string): string[] {
	return currencySymbol[code as keyof typeof currencySymbol];
}
