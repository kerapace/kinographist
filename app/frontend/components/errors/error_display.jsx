import React from "react";

const ErrorDisplay = ({errors}) => {
  return (
      <aside className="error-container">
        <ul>{errors.map((error,idx) => <li key={idx}>{error}</li>)}</ul>
      </aside>
  );
}

export default ErrorDisplay;