import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { PrivacyContext } from './privacyContext';

interface PrivacyProviderProps {
  children: ReactNode;
}

export const PrivacyProvider: React.FC<PrivacyProviderProps> = ({
  children,
}) => {
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);

  const togglePrivacyMode = () => {
    setIsPrivacyMode((prev) => !prev);
  };

  return (
    <PrivacyContext.Provider value={{ isPrivacyMode, togglePrivacyMode }}>
      {children}
    </PrivacyContext.Provider>
  );
};
