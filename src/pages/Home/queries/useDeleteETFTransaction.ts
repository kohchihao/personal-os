import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteETFTransaction } from '../../../api/etf/deleteETFTransaction';

const useDeleteETFTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteETFTransaction,
    onSuccess: () => {
      // Invalidate and refetch the ETF transactions query
      queryClient.invalidateQueries({ queryKey: ['etfTransactions'] });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete ETF transaction. Please try again.',
        color: 'red',
      });
    },
  });
};

export default useDeleteETFTransaction;
