import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import MenuBar from "./MenuBar";
// ToDo Blockquote & Icons + Styling
const Editor = ({ setDescription, hideMenubar }) => {
  const editor = useEditor({
    extensions: [
      /* Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }), */
      StarterKit,
      Underline,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      // Editor Content ViewBox Tailwind Styling
      attributes: {
        class:
          "prose min-h-10 prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    content: ``,

    onUpdate: ({ editor }) => {
      console.log(editor);
      const json = editor.getJSON();

      setDescription(json);
    },
  });

  return (
    <div className="border border-sky-500 wysiwyg-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {/*<EditorView className="" content={editor} /> */}
    </div>
  );
};

export default Editor;
