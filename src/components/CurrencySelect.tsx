import { CurrencyCodes } from "../data";

const CurrencySelect = ({selectedCurrency,handleCurrency}:{selectedCurrency:string,handleCurrency:(event: React.ChangeEvent<HTMLSelectElement>) => void;}) => {
	const countryCode:string=selectedCurrency.substring(0,2);
    
    return (
		<div className="currency-select">
			<img src={`https://flagsapi.com/${countryCode}/flat/64.png`} />
			<select name="" id="" className="currency-dropdown"
            onChange={handleCurrency}
            value={selectedCurrency}>
				{CurrencyCodes.map((currency) => (
					<option key={currency} value={currency}>
						{currency}
					</option>
				))}
			</select>
		</div>
	);
};

export default CurrencySelect;
