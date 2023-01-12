import { EditorContent } from "@tiptap/react";

const EditorView = ({ content }) => {
  return (
    <div>
      <EditorContent editor={content} />
    </div>
  );
};

export default EditorView;
