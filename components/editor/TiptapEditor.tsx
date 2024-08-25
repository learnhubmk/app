import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import styles from './TiptapEditor.module.scss';

const TiptapEditor = ({
  content,
  editable,
  onChange,
}: {
  content: string;
  editable: boolean;
  onChange?: (content: string) => void;
}) => {
  const editorInstance = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor: updatedEditor }) => {
      if (onChange) {
        onChange(updatedEditor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editorInstance) {
      editorInstance.commands.setContent(content);
    }
  }, [content, editorInstance]);

  useEffect(() => {
    if (editorInstance) {
      editorInstance.setEditable(editable);
    }
  }, [editable, editorInstance]);

  if (!editorInstance) {
    return null;
  }

  return (
    <div className={styles.tiptapEditorContainer}>
      {editable && (
        <div className={styles.tiptapToolbar}>
          <button type="button" onClick={() => editorInstance.chain().focus().toggleBold().run()}>
            Bold
          </button>
          <button type="button" onClick={() => editorInstance.chain().focus().toggleItalic().run()}>
            Italic
          </button>
          <button type="button" onClick={() => editorInstance.chain().focus().toggleStrike().run()}>
            Strike
          </button>
          <button type="button" onClick={() => editorInstance.chain().focus().setParagraph().run()}>
            Paragraph
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            h1
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            h2
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            h3
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().setTextAlign('left').run()}
          >
            Left
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().setTextAlign('center').run()}
          >
            Center
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().setTextAlign('right').run()}
          >
            Right
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().setTextAlign('justify').run()}
          >
            Justify
          </button>
        </div>
      )}
      <EditorContent editor={editorInstance} />
    </div>
  );
};

export default TiptapEditor;
