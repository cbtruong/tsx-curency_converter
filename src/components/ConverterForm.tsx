import React, { useState,useEffect } from "react";
import CurrencySelect from "./CurrencySelect";

const ConverterForm = () => {
	const [amount, setAmount] = useState<number>(10);
	const [formCurrency, setFormCurrency] = useState<string>("USD");
	const [toCurrency, setToCurrency] = useState<string>("INR");
	const [result, setResult] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Swap the values of fromCurrency and toCurrency
	const handleSwapCurrencies = () => {
		setFormCurrency(toCurrency);
		setToCurrency(formCurrency);
	};
	const getExchangeRate = async () => {
		const API_KEY: string = import.meta.env.VITE_API_KEY;
		const API_URL: string = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${formCurrency}/${toCurrency}`;
        setIsLoading(true);
		try {
			const response = await fetch(API_URL);
			if (!response) {
				throw Error("Something went wrong!");
			}
			const data = await response.json();
			const rate = (data.conversion_rate * amount).toFixed();
			setResult(`${amount} ${formCurrency}=${rate} ${toCurrency}`);
		} catch (err) {
			console.log(err);
		}
        finally {
            setIsLoading(false);
        }
	};

	// Handle form submission
	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		getExchangeRate();
	};

    useEffect(() => 
        {
            const fetchRate = async () => {
                if (formCurrency && toCurrency && amount > 0) {
                  await getExchangeRate();
                }
              };
              fetchRate();
        }, []);
	return (
		<form action="" className="converter-form" onSubmit={handleFormSubmit}>
			<div className="form-group">
				<label htmlFor="" className="form-label">
					Enter Amount
				</label>
				<input
					type="number"
					className="form-input"
					required
					value={amount}
					onChange={(e) => setAmount(parseInt(e.target.value))}
				/>
			</div>
			<div className="form-group form-currency-group">
				<div className="form-section">
					<label htmlFor="" className="form-label">
						From
					</label>
					{/* Currency you want to convert */}
					<CurrencySelect
						selectedCurrency={formCurrency}
						handleCurrency={(e) => setFormCurrency(e.target.value)}
					/>
				</div>
				{/* Icon converter */}
				<div className="swap-icon" onClick={handleSwapCurrencies}>
					<svg
						width="16"
						viewBox="0 0 20 19"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
							fill="#fff"
						/>
					</svg>
				</div>
				<div className="form-section">
					<label htmlFor="" className="form-label">
						to
					</label>
					{/* The currency to be converted into */}
					<CurrencySelect
						selectedCurrency={toCurrency}
						handleCurrency={(e) => setToCurrency(e.target.value)}
					/>
				</div>
			</div>
			<button
				type="submit"
				className={`${isLoading ? "loading" : ""} submit-button`}
			>
				Get Exchange Rate
			</button>
			<p className="exchange-rate-result">
				{isLoading ? "Getting exchange rate..." : result}
			</p>
		</form>
	);
};

export default ConverterForm;
