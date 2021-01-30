import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import "./textEditor.css";
import { Cell } from "../store/cell";
import { useActions } from "../hooks/useActions";

interface ITextEditorProps {
  cell: Cell;
}

const TextEditor: React.FunctionComponent<ITextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor
          value={cell.content}
          onChange={(value) => updateCell(cell.id, value || "")}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || "click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
