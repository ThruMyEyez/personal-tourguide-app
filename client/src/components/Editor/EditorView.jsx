import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

const EditorView = ({ content, editable }) => {
  const viewContent = JSON.parse(content);

  const editor = useEditor({
    content: viewContent,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editable: false,
    editorProps: {
      // Editor Content ViewBox Tailwind Styling
      attributes: {
        class:
          "prose md:w-[62%] rounded-lg shadow-xl bg-zinc-100 py-3 px-6 md:mx-auto mx-6 bg-white min-h-10 prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });
  //editor.setEditable(false);

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorView;
