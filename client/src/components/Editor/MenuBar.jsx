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
  IconList,
} from "../UI/Icons";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="editorMenuBar">
      <div className="flex">
        <div
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconBxBold />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconFormatItalic />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconBxUnderline />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconBxStrikethrough />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={
            editor.isActive("heading", { level: 1 })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          H1
        </div>
        <div
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={
            editor.isActive("heading", { level: 2 })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          h2
        </div>
        <div
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "editorIconActive" : "editorIconInactive"}
        >
          <IconList />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "editorIconActive" : "editorIconInactive"
          }
        >
          <IconOrderedList />
        </div>
        <div
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" }) ? "editorIconActive" : "editorIconInactive"
          }
        >
          <IconTextLeft />
        </div>
        <div
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          <IconTextCenter />
        </div>
        <div
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" }) ? "editorIconActive" : "editorIconInactive"
          }
        >
          <IconTextRight />
        </div>
        <div
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "editorIconActive"
              : "editorIconInactive"
          }
        >
          justify
        </div>
        <div
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "editorIconActive" : "editorIconInactive"}
        >
          Quote
        </div>
      </div>
      <div>
        <div onClick={() => editor.chain().focus().undo().run()}>
          <IconUndo />
        </div>
        <div onClick={() => editor.chain().focus().redo().run()}>
          <IconRedo />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
