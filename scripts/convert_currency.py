import requests
import argparse

# Fetch exchange rates from the ExchangeRate-API
def fetch_exchange_rates(base_currency):
    url = f"https://open.er-api.com/v6/latest/{base_currency}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: Unable to fetch exchange rates (Status Code: {response.status_code})")
        return None

# Convert currencies using fetched rates
def convert_currency(amount, from_currency, to_currency, rates):
    _currency_rates = rates['rates']
    print(f'Currencies: {from_currency}, {to_currency}')
    if from_currency not in _currency_rates or to_currency not in _currency_rates:
        print(f"Error: Unsupported currency code.")
        return None
    converted_amount = (amount / _currency_rates[from_currency]) * _currency_rates[to_currency]
    return converted_amount
    
# Main application
if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="convert_currency"
    )
    
    parser.add_argument(
        "amount",
        type=float,
        help="The amount in the currency you're converting from"
    )
    
    parser.add_argument(
        "curr_from",
        help="The currency you're converting from"
    )
    
    parser.add_argument(
        "curr_to",
        help="The currency you're converting to"
    )
    
    args = parser.parse_args()
    
    converted_amount = convert_currency(args.amount, args.curr_from.upper(), args.curr_to.upper(), fetch_exchange_rates('USD'))
    if converted_amount:
        print(f"\n💱 {args.amount:.2f} {args.curr_from} = {converted_amount:.2f} {args.curr_to}")
    else:
        print("Conversion failed.")