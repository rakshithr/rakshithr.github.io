import React from "react";

class CanvasErrorBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div
          className="fixed inset-0 z-0 pointer-events-none beam-accent opacity-40"
          aria-hidden
        />
      );
    }
    return this.props.children;
  }
}

export default CanvasErrorBoundary;
