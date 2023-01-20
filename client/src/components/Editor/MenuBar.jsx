import {
  IconEditorBold,
  IconEditorItalic,
  IconEditorUnderline,
  IconEditorStrikethrough,
  IconEditorHOne,
  IconEditorHTwo,
  IconEditorUList,
  IconEditorOList,
  IconEditorTextLeft,
  IconEditorTextCenter,
  IconEditorTextRight,
  IconEditorTextJustify,
  IconEditorQuote,
  IconEditorUndo,
  IconEditorRedo,
} from "../UI/Icons";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="divide-x editorMenuBar">
      <div className="editorIconGroup">
        <div
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconEditorBold />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconEditorItalic />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconEditorUnderline />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconEditorStrikethrough />
        </div>
      </div>

      <div className="editorIconGroup">
        <div
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={
            editor.isActive("heading", { level: 1 })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          <IconEditorHOne />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={
            editor.isActive("heading", { level: 2 })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          <IconEditorHTwo />
        </div>
      </div>

      <div className="editorIconGroup">
        <div
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconEditorUList />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "editorIconActive" : "editorIconInactive"
          }
        >
          <IconEditorOList />
        </div>
      </div>

      <div className="editorIconGroup">
        <div
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" }) ? "editorIconActive" : "editorIconInactive"
          }
        >
          <IconEditorTextLeft />
        </div>
        <div
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          <IconEditorTextCenter />
        </div>
        <div
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" }) ? "editorIconActive" : "editorIconInactive"
          }
        >
          <IconEditorTextRight />
        </div>
        <div
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          <IconEditorTextJustify />
        </div>
      </div>

      <div className="editorIconGroup">
        <div
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconEditorQuote />
        </div>
      </div>

      <div className="editorIconGroup">
        <div onClick={() => editor.chain().focus().undo().run()}>
          <IconEditorUndo />
        </div>
        <div onClick={() => editor.chain().focus().redo().run()}>
          <IconEditorRedo />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
