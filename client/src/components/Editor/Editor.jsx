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

const Editor = () => {
  const [description, setDescription] = useState("");

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

  useEffect(() => {
    console.log(description);
  }, [description]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createEventItem({
      description: JSON.stringify(description),
      title: "testTitle2",
      eventDate: new Date("2023-01-21"),
      places: [
        "63bcc22c2f54a149c076111c",
        "63bcc45eaaf8d6fe5b942c00",
        "63bcc85d404f384a1806104e",
      ],
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
      });
  };

  return (
    <div className="wysiwyg-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <form onSubmit={handleFormSubmit}>
        <button className="btn-primary">Test createProductItem with WYSIWYG json</button>
      </form>
    </div>
  );
};

export default Editor;
