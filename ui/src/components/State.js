import { useState } from "react";

const State = ({ children, ...props }) => {
  const state = useState(props.default);
  return (children(state));
}

export default State;

