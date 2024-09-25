import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block';
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
  const [isCodeBlockActive, setIsCodeBlockActive] = useState(false);

  const editorInstance = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlock,
      BulletList,
      OrderedList,
      Blockquote,
      HorizontalRule,
    ],
    content,
    editable,
    onUpdate: ({ editor: updatedEditor }) => {
      if (onChange) {
        onChange(updatedEditor.getHTML());
      }
      setIsCodeBlockActive(updatedEditor.isActive('codeBlock'));
    },
  });

  useEffect(() => {
    if (editorInstance && editorInstance.getHTML() !== content) {
      editorInstance.commands.setContent(content);
    }
  }, [content, editorInstance]);

  useEffect(() => {
    if (editorInstance) {
      editorInstance.setEditable(editable);
    }
  }, [editable, editorInstance]);

  const handleCodeBlockToggle = () => {
    if (editorInstance) {
      editorInstance.chain().focus().toggleCodeBlock().run();
      setIsCodeBlockActive(editorInstance.isActive('codeBlock'));
    }
  };

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
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().toggleBulletList().run()}
            className={editorInstance.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet list
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().toggleOrderedList().run()}
            className={editorInstance.isActive('orderedList') ? 'is-active' : ''}
          >
            Ordered list
          </button>
          <button
            type="button"
            onClick={handleCodeBlockToggle}
            className={isCodeBlockActive ? styles.codeBlockActive : ''}
          >
            Code Block
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().toggleBlockquote().run()}
            className={editorInstance.isActive('blockquote') ? 'is-active' : ''}
          >
            Blockquote
          </button>
          <button
            type="button"
            onClick={() => editorInstance.chain().focus().setHorizontalRule().run()}
          >
            Horizontal rule
          </button>
        </div>
      )}
      <EditorContent
        editor={editorInstance}
        className={`${styles.tiptap} ${isCodeBlockActive ? styles.codeBlockActive : ''}`}
      />
    </div>
  );
};

export default TiptapEditor;
