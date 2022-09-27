import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { AxiosError } from 'axios';

import useToast from './useToast';

type IError = Record<string, unknown>;

interface IErrorsContext {
  handleErrors(title: string, err: unknown): void;
}

interface IProps {
  children: React.ReactNode;
}

const ErrorsContext = createContext<IErrorsContext>({} as IErrorsContext);

export const ErrorsProvider: React.FC<IProps> = ({ children }) => {
  const { showToast } = useToast();

  const handleErrors = useCallback(
    (title: string, err: IError): void => {
      // Toast props
      let descMessage = '';
      let titleMsg = title;

      // Axios errors
      if (err instanceof AxiosError) {
        // API errors
        if (err?.response?.data?.error) {
          descMessage = err.response.data.error;
        }

        // Celebrate errors
        if (err?.response?.data?.validation) {
          const celebrate = err.response.data.validation;
          descMessage =
            celebrate?.body?.message ||
            celebrate?.query?.message ||
            celebrate?.params?.message ||
            'Unhandled celebrate error';
        }
      }

      // Unhandled errors
      else if (!err || !err?.response) {
        titleMsg = 'Um erro inesperado aconteceu!';
      }

      // Send toast
      showToast({
        title: titleMsg,
        description: descMessage,
        status: 'error',
      });
    },
    [showToast],
  );

  const value = useMemo<IErrorsContext>(
    () => ({
      handleErrors,
    }),
    [handleErrors],
  );

  return (
    <ErrorsContext.Provider value={value}>{children}</ErrorsContext.Provider>
  );
};

export const useErrors = (): IErrorsContext => {
  const context = useContext(ErrorsContext);
  if (!context) {
    throw Error(
      'Component that uses useErrors must be wrapped by ErrorsProvider',
    );
  }
  return context;
};

export default useErrors;
