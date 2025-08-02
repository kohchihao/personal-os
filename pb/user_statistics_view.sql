SELECT 
  id, 
  etf_transactions.etf_name,
  SUM(etf_transactions.units_bought) AS total_units, 
  SUM(etf_transactions.total_cost_with_fee) AS total_invested, 
  etf_transactions.user 
FROM etf_transactions 
GROUP BY etf_transactions.user