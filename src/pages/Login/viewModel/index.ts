import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect } from 'react';
import useAppNavigation from '../../../hooks/useAppNavigation';
import useUser from '../../../hooks/useUser';
import {
  usePbStore,
  type AppState,
  type PbErrorResponse,
} from '../../../lib/pbStore';
import { pb } from '../../../utils/pocketbase';
import { loginSchema } from '../utils';

const useLoginViewModel = () => {
  const setUser = usePbStore((state: AppState) => state.setUser);
  const user = useUser();
  const { navigateHome } = useAppNavigation();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await pb
        .collection('users')
        .authWithPassword(values.email, values.password);
      if (pb.authStore.isValid) {
        setUser(pb.authStore.record);
        navigateHome({});
      }
    } catch (error: unknown) {
      const errorResponse = error as PbErrorResponse;
      if (errorResponse.status === 400) {
        notifications.show({
          color: 'red',
          title: 'Login Error',
          message: errorResponse.data?.message || errorResponse.message,
        });
      }
    }
  };

  /**
   * 1. Automatically navigate to the protected home page if the user is already logged in.
   * 2. Navigate after login is successful.
   */
  useEffect(() => {
    if (!user) {
      return;
    }
    navigateHome({ options: { replace: true } });
  }, [navigateHome, user]);

  //useAutoNavigateToProtectedHome();

  return {
    form,
    onSubmit,
  };
};

export default useLoginViewModel;
