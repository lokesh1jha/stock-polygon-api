exports.getStockData = async (tickerSymbol, date) => {

    try {
        const response = await axios.get(
            `https://api.polygon.io/v3/trades/${tickerSymbol}?timestamp=${date}&apiKey=tj4VvpVexJbKebDlDuaKHDu7puAlGwv8`
        );

        if(!(response && response.data)) {
            return null;
        }
        
        let requiredResponse = {
            open: response.open,
            high: response.high,
            low: response.low,
            close: response.close,
            volume: response.volume
        }

        return requiredResponse
    }
    catch (error) {
        console.log(error);
    }

}