import { useQuery } from '@tanstack/react-query';
import { getETFTransactions } from '../api/etf/getETFTransactions';

const useETFTransactions = () => {
  return useQuery({
    queryKey: ['etfTransactions'],
    queryFn: getETFTransactions,
  });
};

export default useETFTransactions;
