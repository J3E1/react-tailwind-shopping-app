type Product = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
};

type ProductsContext = {
	dummyProducts: DummyProduct[];
	searchResults: DummyProduct[];
	products: Product[];
	isLoading: boolean;
	isLoadingSecond: boolean;
	isSearched: boolean;
	category: string[];
	setIsSearched: (value: React.SetStateAction<boolean>) => void;
	getProductsByCategory: (category: string) => Promise<Product[]>;
	getSingleDummyProduct: (id: string) => Promise<DummyProduct>;
	getAllCategory: () => Promise<string[]>;
	getDummyProductsByCategory: (category: string) => Promise<DummyProduct[]>;
	searchProducts: (term: string) => Promise<DummyProduct[]>;
	getProductsByPage: (
		pageNum: number,
		limit: number
	) => Promise<DummyProduct[]>;
	setIsLoadingState: (state: boolean) => void;
};

type CartItem = {
	id: string;
	title: string;
	price: number;
	totalPrice: number;
	quantity: number;
	image: string;
};

interface DefaultCartState {
	items: CartItem[];
	totalQuantity: number;
	totalPrice: number;
	shipping: number;
	tax: number;
}
type CartPayload =
	| {
			type: 'ADD';
			payload: CartItem;
	  }
	| { type: 'REMOVE' | 'INCREMENT' | 'DECREMENT'; payload: string };
interface CartFunctions {
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	increaseItem: (id: string) => void;
	decreaseItem: (id: string) => void;
}

interface CartContext extends DefaultCartState, CartFunctions {}

interface DummyProduct {
	id: string;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
}
interface DummyProductResponse {
	products: DummyProduct[];
	total: number;
	skip: number;
	limit: number;
}
interface Currency {
	code: string;
	alphaCode: string;
	numericCode: string;
	name: string;
	rate: number;
	date: string;
	inverseRate: number;
}
