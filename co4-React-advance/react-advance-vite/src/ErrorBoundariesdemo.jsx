import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) 
 {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() 
  {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) 
  {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() 
  {
    if (this.state.hasError) 
    {
      return <h2 style={{ color: "red" }}>Something went wrong</h2>;
    }
    return this.props.children;
  }
}

//  Normal component (works fine)
function NormalComponent() 
{
  return <h3 style={{ color: "green" }}>I am ok no error </h3>;
}

//  Buggy component (always throws error)
function BuggyComponent() 
{
  throw new Error("Error Accured");
}

export default function ErrorBoundariesDemo() 
{
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Error Boundary Demo</h1>

      {/* Normal component works as usual */}
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>

      {/* Buggy component crashes but ErrorBoundary catches it */}
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}