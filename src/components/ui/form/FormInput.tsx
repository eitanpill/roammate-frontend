import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  icon?: React.ReactNode;
  helperText?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, helperText, className = '', ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {icon}
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary transition ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-error mt-1">{error.message}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
