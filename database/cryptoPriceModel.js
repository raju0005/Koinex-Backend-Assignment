import mongoose from "mongoose";

const cryptoPriceSchema = new mongoose.Schema({
    coin: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Crypto = mongoose.model('CryptoPrice', cryptoPriceSchema);
export default Crypto
