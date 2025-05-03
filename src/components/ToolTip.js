import React from "react";
import { UncontrolledTooltip } from "reactstrap";

export default function ToolTipComponent({ placement, text, target }) {
  return (
    <div>
      <UncontrolledTooltip
        placement={placement}
        target={target && target}
        style={{ fontSize: "13px" }}
      >
        {text}
      </UncontrolledTooltip>
    </div>
  );
}
