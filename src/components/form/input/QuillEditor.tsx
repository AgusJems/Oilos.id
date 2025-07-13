import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's snow theme CSS

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  // Use a ref for the callback to prevent re-running the effect on every render
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Initialize Quill on component mount
  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
        placeholder,
      });

      const quill = quillInstance.current;

      // Set initial content if provided
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      // Add the 'text-change' event listener
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          let html = quill.root.innerHTML;
          // Treat Quill's empty state as an empty string
          if (html === "<p><br></p>") {
            html = "";
          }
          onChangeRef.current(html);
        }
      });
    }
  }, [placeholder]); // Effect runs only when the placeholder changes

  // Sync the editor's content when the `value` prop changes externally (e.g., form reset)
  useEffect(() => {
    const quill = quillInstance.current;
    if (quill) {
      const editorHTML = quill.root.innerHTML;
      // Avoid updating if the content is the same, to prevent cursor jumps
      if (value !== editorHTML) {
        // Only update if the editor isn't focused, to avoid interrupting the user
        if (!quill.hasFocus()) {
          quill.clipboard.dangerouslyPasteHTML(value);
        }
      }
    }
  }, [value]);

  return <div ref={editorRef} className={className} style={{ minHeight: "200px" }} />;
};

export default QuillEditor;