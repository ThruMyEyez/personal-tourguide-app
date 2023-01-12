import MenuBar from "./MenuBar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
//import Document from "@tiptap/extension-document";
//import Heading from "@tiptap/extension-heading";
//import Paragraph from "@tiptap/extension-paragraph";
//import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

const Editor = ({ setDescription }) => {
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
    injectCSS: false,

    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      //const html = editor.getHTML();
      setDescription(json);
      editor.commands.setContent(json);
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
