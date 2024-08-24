import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import styles from './TiptapEditor.module.scss';

const TiptapEditor = ({ content, editable }: { content: string; editable: boolean }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editable,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.tiptapEditorContainer}>
      {editable && (
        <div className={styles.tiptapToolbar}>
          <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
          <button onClick={() => editor.chain().focus().setParagraph().run()}>Paragraph</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            h1
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            h2
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            h3
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
          <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>
            Center
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
          <button onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
            Justify
          </button>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
