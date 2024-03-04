import * as React from "react";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftEntity,
  RawDraftContentBlock,
} from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import cn from "classnames";
import styles from "./TextEditor.module.scss";
import { convertToTextEditorCustomJSON } from "../utils/helpers";

export function AddTextEditor({
  title,
  onEditorTextChange,
  setIsRequiredFieldProvided,
  isRequiredFieldProvided,
  defaultValue,
}: {
  title: string;
  onEditorTextChange?: (value: string) => void;
  setIsRequiredFieldProvided?: (value: ContentState) => void;
  isRequiredFieldProvided?: boolean | undefined;
  defaultValue?: string;
}) {
  const defaultContentState = convertToTextEditorCustomJSON(defaultValue || "");

  const defaultContentDetails = JSON.parse(defaultContentState);
  const finalDefaultContent = convertFromRaw({
    blocks: defaultContentDetails.blocks as RawDraftContentBlock[],
    entityMap: defaultContentDetails as {
      [key: string]: RawDraftEntity;
    },
  });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(finalDefaultContent)
  );

  const [isFocused, setisFocused] = React.useState(false);

  const onSetEditorState = (newState: EditorState) => {
    setEditorState(newState);
  };

  useEffect(() => {
    const data = editorState.getCurrentContent();

    if (onEditorTextChange) {
      onEditorTextChange(JSON.stringify(convertToRaw(data)));
    }
    if (setIsRequiredFieldProvided) {
      setIsRequiredFieldProvided(editorState.getCurrentContent());
    }
  }, [editorState]);

  return (
    <div>
      <div className={styles.label} aria-label="title">
        {title}
      </div>

      <Editor
        toolbarOnFocus
        onFocus={() => setisFocused(true)}
        onBlur={() => setisFocused(false)}
        editorState={editorState}
        wrapperClassName={styles.wrapper_class}
        editorClassName={cn(
          styles.editor_class,
          isRequiredFieldProvided
            ? styles.editor_class
            : styles.editor_class_not_provided
        )}
        toolbarClassName={
          isFocused ? styles.toolbar_class : styles.toolbar_class_hide_toolbar
        }
        onEditorStateChange={onSetEditorState}
        toolbar={{
          options: ["inline", "list", "textAlign"],
        }}
      />
    </div>
  );
}
