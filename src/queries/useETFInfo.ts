import { useQuery } from '@tanstack/react-query';
import getETFInfo from '../api/etf/getETFInfo';

const useETFInfo = () => {
  return useQuery({
    queryKey: ['etfInfo'],
    queryFn: getETFInfo,
    gcTime: 1000 * 60 * 15, // Cache for 15mins
  });
};

export default useETFInfo;
