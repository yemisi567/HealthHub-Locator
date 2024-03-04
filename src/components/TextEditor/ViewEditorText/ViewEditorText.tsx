import React from "react";
import {
  convertFromRaw,
  RawDraftContentBlock,
  RawDraftEntity,
  Editor,
  EditorState,
} from "draft-js";
import { convertToTextEditorCustomJSON } from "../../utils/helpers";

export function ViewEditorText({ text }: { text: string }) {
  const contentState = convertToTextEditorCustomJSON(text || "");

  const contentDetails = JSON.parse(contentState);
  const finalDraft = convertFromRaw({
    blocks: contentDetails.blocks as RawDraftContentBlock[],
    entityMap: contentDetails as {
      [key: string]: RawDraftEntity;
    },
  });
  const editorState = EditorState.createWithContent(finalDraft);

  return (
    <div style={{ fontSize: "1.4rem" }} aria-label="text">
      <Editor editorState={editorState} readOnly onChange={() => []} />
    </div>
  );
}
