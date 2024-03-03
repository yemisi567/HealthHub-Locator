import React from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text */
  label?: string;
  /** Check if the input has error */
  hasError?: boolean;
  /** Displays error message when input has error */
  errorText?: string;
  /** Extra optional classname */
  name?: string;
  /** Determine if component should be hidden */
  hidden?: boolean;
  /** Is field required, this will display a "*" text beside the label" */
  isRequired?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hasError, name, errorText, hidden, isRequired, ...props }, ref) => {
    return (
      <div hidden={hidden}>
        <div>
          {label && (
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
          )}
          <div className={styles.flex}>
            {isRequired && <div className={styles.required}>*</div>}
            <input
              className={styles.input}
              aria-label={label}
              id={name}
              name={name}
              {...props}
              ref={ref}
              placeholder={props.placeholder}
            />
          </div>
        </div>

        {hasError ? <p className={styles.error}>{errorText}</p> : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
