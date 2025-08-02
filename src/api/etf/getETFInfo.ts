const getETFInfo = async (): Promise<number> => {
  const etf = import.meta.env.VITE_ETF_TICKER;
  try {
    const response = await fetch(
      `https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/${etf}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data?.chart?.result?.[0]?.meta?.regularMarketPrice;
  } catch (error) {
    console.error('Error fetching ETF info:', error);
    throw error;
  }
};

export default getETFInfo;
