import { createContext, useContext } from 'react';

export interface PrivacyContextType {
  isPrivacyMode: boolean;
  togglePrivacyMode: () => void;
}

export const PrivacyContext = createContext<PrivacyContextType | undefined>(
  undefined
);

export const usePrivacy = () => {
  const context = useContext(PrivacyContext);
  if (context === undefined) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
};
