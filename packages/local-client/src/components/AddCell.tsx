import React from "react";

import "./addCell.css";
import { useActions } from "../hooks/useActions";

interface IAddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FunctionComponent<IAddCellProps> = ({
  previousCellId,
  forceVisible,
}) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>code</span>
        </button>
        <button
          className="button is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
