import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormDateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  icon?: React.ReactNode;
}

export const FormDateInput = React.forwardRef<HTMLInputElement, FormDateInputProps>(
  ({ label, error, icon, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {icon}
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="date"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
          {...props}
        />
        {error && (
          <p className="text-sm text-error mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

FormDateInput.displayName = 'FormDateInput';
