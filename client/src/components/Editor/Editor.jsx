import { useState, useEffect } from "react";
import { MenuBar } from "./MenuBar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
//import Document from "@tiptap/extension-document";
//import Heading from "@tiptap/extension-heading";
//import Paragraph from "@tiptap/extension-paragraph";
//import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { createEventItem } from "../../services/product";

const Editor = ({ description, setDescription, handleFormSubmit }) => {
  //const [description, setDescription] = useState("");

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
    <div className="wysiwyg-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
