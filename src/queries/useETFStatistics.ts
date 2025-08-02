import { useQuery } from '@tanstack/react-query';
import { getETFStatistics } from '../api/etf/getETFStatisitcs';

const useETFStatistics = () => {
  return useQuery({
    queryKey: ['etfStatistics'],
    queryFn: getETFStatistics,
  });
};

export default useETFStatistics;
