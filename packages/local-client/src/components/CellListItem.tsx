import React from "react";

import { Cell } from "../store";
import ActionBar from "./ActionBar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import "./cellListItem.css";

interface ICellListItemProps {
  cell: Cell;
}

const CellListItem: React.FunctionComponent<ICellListItemProps> = ({
  cell,
}) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }

  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
