import React, { useEffect } from "react";

import "./codeCell.css";
import CodeEditor from "./codeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { Cell } from "../store/cell";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";

interface ICodeCellProps {
  cell: Cell;
}

const CodeCell: React.FunctionComponent<ICodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundle[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer: NodeJS.Timeout = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className="progress-cover">Loading...</div>
        ) : (
          <Preview code={bundle.code} error={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
