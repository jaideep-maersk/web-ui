import React, { useState, InputHTMLAttributes } from 'react';

export interface SensitiveInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
  onChange: (value: string) => void;
  type?: 'password' | 'text';
  label?: string;
  outerClassName?: string;
  inputClassName?: string;
  showButtonClassName?: string;
  screenReader?: boolean;
}

export const SensitiveInput: React.FC<SensitiveInputProps> = ({
  id = 'password-input',
  value,
  onChange,
  type = 'password',
  placeholder = 'Password',
  required = true,
  readOnly = false,
  label,
  outerClassName = 'flex flex-1 bg-transparent',
  inputClassName = 'w-full text-sm py-0.5 bg-transparent outline-none',
  showButtonClassName = 'pl-1.5 transition bg-transparent',
  screenReader = true,
  ...props
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={outerClassName}>
      {screenReader && (
        <label className="sr-only" htmlFor={id}>
          {label || placeholder || 'Password'}
        </label>
      )}
      <input
        id={id}
        className={`${inputClassName} ${show ? '' : 'password'} placeholder:text-gray-300 dark:placeholder:text-gray-600`}
        placeholder={placeholder}
        type={type === 'password' && !show ? 'password' : 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required && !readOnly}
        disabled={readOnly}
        autoComplete="off"
        {...props}
      />
      <button
        className={showButtonClassName}
        type="button"
        aria-pressed={show}
        aria-label={show ? 'Hide password' : 'Show password'}
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
      >
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
              clipRule="evenodd"
            />
            <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
            <path
              fillRule="evenodd"
              d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
