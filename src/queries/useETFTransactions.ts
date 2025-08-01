import { useQuery } from '@tanstack/react-query';
import { getETFTransactions } from '../api/getETFTransactions';

const useETFTransactions = () => {
  return useQuery({
    queryKey: ['etfTransactions'],
    queryFn: getETFTransactions,
  });
};

export default useETFTransactions;
