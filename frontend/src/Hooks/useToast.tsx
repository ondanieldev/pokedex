import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useToast as chakraUseToast, UseToastOptions } from '@chakra-ui/react';

interface IToastContext {
  showToast: (data: UseToastOptions) => void;
}

interface IProps {
  children: React.ReactNode;
}

const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider: React.FC<IProps> = ({ children }) => {
  const toast = chakraUseToast();

  const showToast = useCallback(
    (data: UseToastOptions): void => {
      toast({
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        ...data,
      });
    },
    [toast],
  );

  const value = useMemo<IToastContext>(
    () => ({
      showToast,
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext);

  if (!context) {
    throw Error(
      'Component that uses useToast must be wrapped by ToastProvider',
    );
  }

  return context;
};

export default useToast;
