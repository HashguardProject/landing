import React, { createContext, useContext, ReactNode } from 'react';
import { getAppUrl, getAppPath, getActionUrl } from '../utils/environment';

interface AppUrlContextType {
  /** Base URL for the app (localhost:3000 in dev, app.hashguard.xyz in prod) */
  baseUrl: string;
  
  /** Get a full URL for a specific app path */
  getPath: (path?: string) => string;
  
  /** Get a URL for a specific action (login, signup, etc.) */
  getActionUrl: (action: string) => string;
  
  /** Whether the app is running in development mode */
  isDevelopment: boolean;
}

const AppUrlContext = createContext<AppUrlContextType | undefined>(undefined);

export const useAppUrl = (): AppUrlContextType => {
  const context = useContext(AppUrlContext);
  if (!context) {
    throw new Error('useAppUrl must be used within an AppUrlProvider');
  }
  return context;
};

interface AppUrlProviderProps {
  children: ReactNode;
}

export const AppUrlProvider: React.FC<AppUrlProviderProps> = ({ children }) => {
  const baseUrl = getAppUrl();
  const isDevelopment = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
  
  const value: AppUrlContextType = {
    baseUrl,
    getPath: getAppPath,
    getActionUrl,
    isDevelopment
  };
  
  return (
    <AppUrlContext.Provider value={value}>
      {children}
    </AppUrlContext.Provider>
  );
};

export default AppUrlProvider; 