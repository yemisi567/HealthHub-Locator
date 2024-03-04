import * as React from "react";
import cn from "classnames";
import ReactSelect, {
  GroupBase,
  Props,
  SelectInstance,
  StylesConfig,
} from "react-select";
import styles from "./Select.module.scss";

export function DropdownIndicator() {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8">
        <path d="M6 6.66675L0 0.416748H12L6 6.66675Z" fill="#576A81" />
      </g>
    </svg>
  );
}

interface SelectProps extends Props {
  /** Select label text */
  label: string;
  /** Check select has error */
  hasError?: boolean;
  /** Select error text */
  errorText?: string;
  /** Id to link select and its label */
  id?: string;
  /** Styles object to edit styles outside of component */
  selectStyles?: StylesConfig<unknown, boolean, GroupBase<unknown>>;
  /** Class to style select outer container */
  wrapperClass?: string;
  /** Determines if the select isSearchable */
  isSearchable?: boolean;
  /** Function that is used to alter the label of the options */
  getOptionLabel?: (options: unknown) => string;
  /** Is field required, this will display a "*" text beside the label" */
  isRequired?: boolean;
}

export type SelectElement = SelectInstance<
  unknown,
  boolean,
  GroupBase<unknown>
> | null;

const Select = React.forwardRef<SelectElement, SelectProps>(
  (
    {
      label,
      hasError,
      errorText,
      className,
      id,
      selectStyles,
      wrapperClass,
      isSearchable,
      getOptionLabel,
      isRequired,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <div className={cn(wrapperClass, styles.wrap)}>
          <label
            className={cn(
              styles.label,
              "fs-exclude",
              {
                [styles.label_required]: isRequired,
              },
              className
            )}
            htmlFor={id}
          >
            {label}
          </label>
          <ReactSelect
            getOptionLabel={getOptionLabel}
            ref={ref}
            aria-errormessage={errorText}
            styles={{
              container: () => ({
                position: "relative",
                boxSizing: "border-box",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              control: (_, { isDisabled }) => ({
                fontFamily: `"Manrope", sans-serif`,
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "0.02em",
                height: "100%",
                padding: "28px 24px 10px 24px",
                background: hasError
                  ? "rgba(247, 23, 53, 0.04)"
                  : "rgba(185, 186, 163, 0.1)",
                border: hasError
                  ? "1px solid #F71735"
                  : "1px solid rgba(185, 186, 163, 0.4)",
                borderRadius: "6px",
                boxShadow: "none",
                cursor: isDisabled ? "not-allowed" : "default",
                color: isDisabled ? "rgba(11, 19, 43, 0.4)" : "black",

                "&:focus": {
                  background: "rgba(185, 186, 163, 0.1)",
                  border: "1px solid #b9baa3",
                  borderRadius: "6px",
                },
                "&:hover": {
                  background: hasError
                    ? "rgba(247, 23, 53, 0.04)"
                    : "rgba(185, 186, 163, 0.1)",
                  border: hasError
                    ? "1px solid #F71735"
                    : (isDisabled && "1px solid rgba(185, 186, 163, 0.4)") ||
                      "1px solid #b9baa3",
                  borderRadius: "6px",
                },
              }),
              valueContainer: () => ({
                padding: 0,
                height: "auto",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }),

              singleValue: () => ({
                margin: 0,
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "0.02em",
                textTransform: "capitalize",
                opacity: props.isDisabled ? 0.9 : 1,
              }),
              placeholder: () => ({
                margin: 0,
                color: props.isDisabled ? "rgba(87, 106, 129, 0.8)" : "#576a81",
                opacity: 0.9,
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "0.02em",
              }),
              menu: () => ({
                background: "white",
                boxShadow: "1px 4px 20px rgba(11, 19, 43, 0.08)",
                borderRadius: "8px",
                marginTop: "0.8rem",
                marginBottom: "0.8rem",
                position: "absolute",
                width: "100%",
                top: "100%",
                zIndex: 10,
                overflowY: "scroll",
              }),
              menuList: () => ({
                padding: "16px 8px",
                maxHeight: "40rem",
                overflowY: "auto",
                position: "relative",
              }),
              option: () => ({
                color: "#576a81",
                fontSize: "14px",
                lineHeight: "19px",
                fontWeight: "500",
                padding: "6px 16px",
                letterSpacing: "0.02em",
                fontFamily: `"Manrope", sans-serif`,
                cursor: "pointer",

                "&:hover": {
                  backgroundColor: "rgba(185, 186, 163, 0.1)",
                },

                "&:not(:last-child)": {
                  marginBottom: "0.6rem",
                },
              }),
              clearIndicator: () => ({
                position: "absolute",
                top: "55%",
                right: "0",
                transform: "translateY(-55%)",
                cursor: "pointer",
              }),
              indicatorsContainer: () => ({
                display: props.isDisabled ? "none" : "block",
              }),
              ...selectStyles,
            }}
            className={styles.select}
            placeholder={label}
            menuPosition="absolute"
            menuPlacement="auto"
            id={id}
            isSearchable={isSearchable || false}
            components={{
              DropdownIndicator,
            }}
            {...props}
          />
        </div>
        {hasError ? (
          <div className={cn(styles.error, "fs-exclude")}>
            <span>
              <p>{errorText}</p>
            </span>
          </div>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Input";

export default Select;
