import { useNavigate, type NavigateOptions } from 'react-router-dom';
import { Routes } from '../utils/navigator';

const useAppNavigation = () => {
  const navigate = useNavigate();

  return {
    navigateHome: ({ options }: { options?: NavigateOptions }) =>
      navigate(Routes.home(), options),
    navigateLogin: ({ options }: { options?: NavigateOptions }) =>
      navigate(Routes.login(), options),

    navigateTo: (path: string, options?: NavigateOptions) =>
      navigate(path, options),
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
    refreshPage: () => navigate(0),
  };
};

export default useAppNavigation;
