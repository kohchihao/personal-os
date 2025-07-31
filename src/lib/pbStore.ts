import type { AuthRecord } from 'pocketbase';
import { create } from 'zustand';
import { pb } from '../utils/pocketbase';

export type ExtendedUser = AuthRecord;

export type PbErrorResponse = {
  status: number;
  data?: {
    message: string;
  };
  message?: string;
};

export type AppState = {
  user: ExtendedUser | null;
  setUser: (user: ExtendedUser) => void;
  logoutUser: () => void;
};

export const usePbStore = create<AppState>((set) => ({
  user: pb.authStore.record ? (pb.authStore.record as ExtendedUser) : null,
  // TODO: probably need to store token too.
  setUser: (user) => set(() => ({ user: user })),
  logoutUser: () => {
    pb.authStore.clear();
    set(() => ({ user: null }));
  },
}));
