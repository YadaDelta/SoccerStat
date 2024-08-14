import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="errorBoundaryMessage">
            <h3>Упс</h3>
            <h3>К сожалению произошла неожиданная ошибка:</h3>
            <h3>{this.state.errorMessage.toString()}</h3>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
