import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {
  usePbStore,
  type AppState,
  type ExtendedUser,
} from '../../lib/pbStore';
import { pb } from '../../utils/pocketbase';

const Layout = () => {
  const setUser = usePbStore((state: AppState) => state.setUser);
  const logoutUser = usePbStore((state: AppState) => state.logoutUser);
  useEffect(() => {
    const changeUser = () => {
      pb.authStore.onChange(() => {
        setUser(pb.authStore.record as ExtendedUser);
      });
      if (!pb.authStore.isValid === true) {
        logoutUser();
      }
    };
    changeUser();
  }, [setUser, logoutUser]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
