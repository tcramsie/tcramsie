// main.js

const walletAddress = "0xAAee01e392ef10865685B4f66b19e5a8EAA678DD";
const initialInvestment = 4575.28 + 150.0 + 2000.0;
const coins = [
    { name: "Ethereum", balance: 0.0, symbol: "ETH", id: "ethereum" },
    { name: "Bitcoin", balance: 0.005, symbol: "BTC", id: "bitcoin" },
    { name: "Litecoin", balance: 0.0, symbol: "LTC", id: "litecoin" },
    { name: "XRP", balance: 5446.04, symbol: "XRP", id: "ripple" },
    { name: "Brett", balance: 1698.31, symbol: "Brett", id: "brett-coin-id" },
    { name: "Wolf", balance: 74589.43, symbol: "Wolf", id: "wolf-coin-id" },
    { name: "Pika", balance: 192307.69, symbol: "Pika", id: "pika-coin-id" },
    { name: "Bdag", balance: 102739.35 + 11800, symbol: "Bdag", id: "bdag-coin-id" },
    { name: "ADA", balance: 793.0, symbol: "ADA", id: "cardano" },
    { name: "$PEPU", balance: 31250.0, symbol: "$PEPU", id: "pepu-coin-id" },
    { name: "Argy Bargy", balance: 214285.71, symbol: "Argy", id: "argy" },
    { name: "Moodeng", balance: 5845.269861496331, symbol: "MDG", id: "moo-deng" }
];

const customPrices = {
    "brett-coin-id": 0.09022,
    "wolf-coin-id": 0.00309,
    "pika-coin-id": 0.0000000003066,
    "bdag-coin-id": 0.019,
    "pepu-coin-id": 0.008032,
    "argy": 0.0007,
    "moo-deng": 1.0
};

document.getElementById("wallet-address").innerText = walletAddress;

coins.forEach((coin, index) => {
    document.getElementById(`coin${index + 1}-name`).innerText = coin.name;
    document.getElementById(`coin${index + 1}-balance`).innerText = `${coin.balance.toFixed(2)} ${coin.symbol}`;
});

async function fetchPrices() {
    const ids = coins.filter(coin => coin.id).map(coin => coin.id).join(",");
    if (!ids) return {};

    const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_7d_change=true`
    );
    const prices = await response.json();
    return prices;
}

async function updatePortfolioValue() {
    const prices = await fetchPrices();
    let totalValue = 0;

    coins.forEach((coin, index) => {
        const price = prices[coin.id]?.usd || customPrices[coin.id] || 0;
        const coinValue = price * coin.balance;
        totalValue += coinValue;

        const coinPriceElement = document.getElementById(`coin${index + 1}-price`);
        const coinBalanceElement = document.getElementById(`coin${index + 1}-balance`);

        if (coinPriceElement) {
            coinPriceElement.innerText = `$${price.toFixed(10)} USD`;
        }
        if (coinBalanceElement) {
            coinBalanceElement.innerText = `${coin.balance.toFixed(2)} ${coin.symbol} ($${coinValue.toFixed(2)})`;
        }
    });

    document.getElementById("total-value").innerText = `$${totalValue.toFixed(2)}`;
}

updatePortfolioValue();
setInterval(updatePortfolioValue, 60000);
