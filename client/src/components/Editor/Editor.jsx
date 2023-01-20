import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import MenuBar from "./MenuBar";
// ToDo Blockquote & Icons + Styling
const Editor = ({ setDescription, content }) => {
  console.log("editor contents: ", content);
  const editor = useEditor({
    content: content,
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
          "prose min-h-10 p-3 prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none ",
      },
    },
    //setContent(content),
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setDescription(json);
    },
  });

  //editor.commands.setContent(content);

  return (
    <div className="rounded-lg shadow-md hover:shadow-lg glass bg-zinc-300 hover:bg-zinc-400 wysiwyg-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {/*<EditorView className="" content={editor} /> */}
    </div>
  );
};

export default Editor;
