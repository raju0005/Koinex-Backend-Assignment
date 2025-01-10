import axios from 'axios';
import Crypto from '../database/cryptoPriceModel.js';



const fetchCryptoData = async () => {
    const COINS = ['bitcoin', 'matic-network', 'ethereum'];

    try {
        const { data } = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
            {
                headers: {
                    'X-CG-Pro-API-Key': process.env.COINGECKO_API_KEY,
                },
            }
        );
        const operations = COINS.map((coin) => ({
            coin,
            price: data[coin].usd,
            marketCap: data[coin].usd_market_cap,
            change24h: data[coin].usd_24h_change,
        }));
        console.log(operations);
        

        await Crypto.insertMany(operations);
        console.log('Data fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
    }
}

export default fetchCryptoData
