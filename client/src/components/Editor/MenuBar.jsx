import {
  IconUndo,
  IconRedo,
  IconBxBold,
  IconFormatItalic,
  IconBxStrikethrough,
  IconBxUnderline,
  IconTextCenter,
  IconTextRight,
  IconTextLeft,
  IconOrderedList,
} from "../UI/Icons";
export const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="editorMenuBar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconBxBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconFormatItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconBxUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconBxStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={
            editor.isActive("heading", { level: 1 })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={
            editor.isActive("heading", { level: 2 })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          h2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "editorIconActive" : "editorIconInactive"}
        >
          ListUl
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "editorIconActive" : "editorIconInactive"
          }
        >
          <IconOrderedList />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" }) ? "editorIconActive" : "editorIconInactive"
          }
        >
          <IconTextLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          <IconTextCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" }) ? "editorIconActive" : "editorIconInactive"
          }
        >
          <IconTextRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          justify
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "editorIconActive" : "editorIconInactive"}
        >
          QuoteLeft
        </button>
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <IconUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <IconRedo />
        </button>
      </div>
    </div>
  );
};
