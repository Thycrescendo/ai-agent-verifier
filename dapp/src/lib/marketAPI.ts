// CoinGecko API integration for live prices
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
const SUPPORTED_COINS = ["filecoin", "bitcoin", "ethereum", "ripple", "litecoin", "cardano"];

export interface LivePrice {
  coin: string;
  price: number;
  change24h: number;
  volume24h: number;
  timestamp: number;
}

export const getLivePrices = async (): Promise<LivePrice[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/simple/price?ids=${SUPPORTED_COINS.join(",")}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`
    );
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    const prices: LivePrice[] = [];
    
    SUPPORTED_COINS.forEach((coin) => {
      const coinData = data[coin];
      if (coinData) {
        prices.push({
          coin,
          price: coinData.usd,
          change24h: coinData.usd_24h_change || 0,
          volume24h: coinData.usd_24h_vol || 0,
          timestamp: Date.now(),
        });
      }
    });
    
    return prices;
  } catch (error) {
    console.error("Failed to fetch live prices:", error);
    // Fallback to simulated data
    return [
      { coin: "filecoin", price: 5.5, change24h: 2.3, volume24h: 1500000, timestamp: Date.now() },
      { coin: "bitcoin", price: 65000, change24h: 1.8, volume24h: 25000000000, timestamp: Date.now() },
      { coin: "ethereum", price: 2800, change24h: 0.9, volume24h: 12000000000, timestamp: Date.now() },
    ];
  }
};

export const getTradingPairs = async (): Promise<{ pair: string; price: number; volume: number; change: number }[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=filecoin,bitcoin,ethereum,ripple,litecoin,cardano&order=market_cap_desc&per_page=6&page=1&sparkline=false&price_change_percentage=24h`
    );
    
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);
    
    const data = await response.json();
    return data.map((coin: any) => ({
      pair: `${coin.symbol.toUpperCase()}/USD`,
      price: coin.current_price,
      volume: coin.total_volume,
      change: coin.price_change_percentage_24h || 0,
    }));
  } catch (error) {
    console.error("Failed to fetch trading pairs:", error);
    return [
      { pair: "FIL/USD", price: 5.5, volume: 1500000, change: 2.3 },
      { pair: "BTC/USD", price: 65000, volume: 25000000000, change: 1.8 },
      { pair: "ETH/USD", price: 2800, volume: 12000000000, change: 0.9 },
    ];
  }
};