// src/components/TiptapEditor.tsx

import React from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

/**
 * NOTE:
 * The CSS below is a basic example to get you started.
 * In your actual application, you should replace these styles
 * with Tailwind CSS classes to match your design system.
 * For example, a button could have:
 * className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
 * and an active button could have:
 * className={editor.isActive('bold') ? 'bg-black text-white' : '...'}
 */
const editorStyles = `
.tiptap-container {
  border: 1px solid #4A5568; /* border-gray-600 */
  border-radius: 0.5rem; /* rounded-lg */
  padding: 0.75rem; /* p-3 */
  background-color: #1A202C; /* bg-gray-800 */
  color: #E2E8F0; /* text-gray-300 */
}

.menu-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem; /* gap-2 */
  margin-bottom: 0.75rem; /* mb-3 */
  border-bottom: 1px solid #4A5568; /* border-gray-600 */
  padding-bottom: 0.75rem; /* pb-3 */
}

.menu-bar button {
  font-family: sans-serif;
  border: 1px solid #718096; /* border-gray-500 */
  background-color: #2D3748; /* bg-gray-700 */
  color: #E2E8F0; /* text-gray-300 */
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  border-radius: 0.25rem; /* rounded */
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-bar button:hover {
    background-color: #4A5568; /* hover:bg-gray-600 */
}

.menu-bar button.is-active {
  background-color: #4299E1; /* bg-blue-500 */
  color: #fff;
}

.ProseMirror {
  min-height: 250px;
  padding: 0.5rem;
}

.ProseMirror:focus {
  outline: none;
}

/* Placeholder styles */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #718096; /* text-gray-500 */
  pointer-events: none;
  height: 0;
}
`;

// MenuBar component with TypeScript type for the editor prop
const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        Bullet List
      </button>
    </div>
  );
};

// Main editor component
const TiptapEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <h2>
        Welcome to your new editor!
      </h2>
      <p>
        This is a basic example of Tiptap running in a <b>TailAdmin React</b> project.
      </p>
      <p>
        Since you're using <b>Tailwind CSS</b>, you can easily style the buttons and the editor content by replacing the example CSS with Tailwind classes.
      </p>
    `,
  });

  // Example of how to get the content for a form submission
  const handleGetContent = () => {
    if (editor) {
      const html = editor.getHTML();
      console.log(html);
      alert("Editor content (HTML) has been logged to the console.");
      // You can now send this 'html' string to your server
    }
  };

  return (
    <div>
      <style>{editorStyles}</style>
      <div className="tiptap-container">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <button 
        onClick={handleGetContent} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Get HTML Content
      </button>
    </div>
  );
};

export default TiptapEditor;
