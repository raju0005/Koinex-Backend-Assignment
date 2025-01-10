import Crypto from "../database/cryptoPriceModel.js";

const getStats = async (req, res) => {
    const { coin } = req.query;

    try {
        const latestRecord = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

        if (!latestRecord) {
            return res.status(404).json({ message: 'Data not found for the requested coin.' });
        }

        res.json({
            price: latestRecord.price,
            marketCap: latestRecord.marketCap,
            '24hChange': latestRecord.change24h,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const getDeviation = async (req, res) => {
    const { coin } = req.query;

    try {
        const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

        if (records.length === 0) {
            return res.status(404).json({ message: 'Not enough data available.' });
        }

        const prices = records.map((record) => record.price);
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance).toFixed(2);

        res.json({ deviation: parseFloat(deviation) });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
export { getDeviation, getStats }