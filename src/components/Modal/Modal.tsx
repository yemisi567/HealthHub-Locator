import * as React from "react";
import cn from "classnames";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

interface ModalProps {
  /** Modal content */
  children: React.ReactNode;
  /** Classname to style modal wrapper */
  wrapperClass?: string;
  /** Modal header title */
  header?: string;
  /** Determines either to modal header is shown or not
   * useful for confirmation modals
   */
  showHeader?: boolean;
  /** make close Icon visible or not */
  closable?: boolean;
  /** switch modal to the center */
  centered?: boolean;
  /** function to call if the close Icon is clicked */
  onCloseButton: () => void;
  /** function to call if the mask is clicked */
  onMaskClose?: () => void;
  /** function to call if the ok button is clicked */
  onOkClick?: () => void;
  /** function to call if the cancel button is clicked */
  onCancelClick?: () => void;
  /** Text of the OK button */
  okText?: string;
  /** Text of the Cancel button */
  cancelText?: string;
  /** show or hide the footer  */
  showFooter?: boolean;
  /** show or hide the back button  */
  showBackBtn?: boolean;
  /** show or hide back button */
  isOkBtnDisabled?: boolean;
  /** disable cancel button */
  isCancelBtnDisabled?: boolean;
  /** disable back button */
  isBackBtnDisabled?: boolean;
  /** submit button form value (use this to link a button to a form anywhere in the document) */
  submitBtnFormValue?: string;
}

export default function Modal({
  children,
  closable = true,
  centered = false,
  header,
  showHeader = true,
  onCloseButton,
  onMaskClose,
  onCancelClick,
  onOkClick,
  okText,
  cancelText,
  submitBtnFormValue,
  showFooter = false,
  showBackBtn = false,
  isOkBtnDisabled,

  isCancelBtnDisabled,
  wrapperClass,
}: ModalProps) {
  const modalRoot = document.getElementById("modal--root") as HTMLElement;

  const content: React.ReactNode = (
    <>
      <div
        className={cn(styles.container, {
          [styles.container_centered]: centered,
        })}
        onClick={
          isCancelBtnDisabled && isOkBtnDisabled ? undefined : onCloseButton
        }
        role="button"
        tabIndex={0}
        onKeyPress={onCloseButton || onMaskClose}
        aria-label="maskClose"
      />
      <div
        className={cn(
          centered ? styles.modal_centered : styles.modal,
          wrapperClass
        )}
      >
        <div className={styles.modal_container}>
          {showHeader && (
            <div className={styles.modal_header}>
              <span className={cn(styles.modal_header_text, "fs-exclude")}>
                {header}
              </span>
              {closable && (
                <button
                  className={styles.modal_header_close}
                  onClick={onCloseButton}
                  type="button"
                  aria-label="closeModal"
                >
                  X
                </button>
              )}
            </div>
          )}
          <div className={styles.modal_content}>{children}</div>
          {showFooter && (
            <div
              className={cn(styles.modal_footer, {
                [styles.modal_footer_three]: showBackBtn,
                [styles.modal_footer_two]: !showBackBtn,
              })}
            >
              {cancelText && (
                <button
                  className="btn-custom"
                  onClick={onCancelClick}
                  disabled={isCancelBtnDisabled}
                >
                  {cancelText}
                </button>
              )}

              <button
                className="btn-custom"
                onClick={onOkClick}
                type="submit"
                form={submitBtnFormValue}
                disabled={isOkBtnDisabled}
              >
                {okText}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(content, modalRoot);
}
