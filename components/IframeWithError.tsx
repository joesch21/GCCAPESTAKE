import { useState } from "react";

interface IframeWithErrorProps {
  src: string;
  title: string;
  className?: string;
}

const IframeWithError: React.FC<IframeWithErrorProps> = ({ src, title, className }) => {
  const [hasError, setHasError] = useState(false);

  const handleReload = () => {
    setHasError(false);
  };

  return (
    <div className="iframe-container">
      {!hasError ? (
        <iframe
          src={src}
          title={title}
          className={className}
          onError={(e) => {
            console.error("Iframe loading error:", e);
            setHasError(true);
          }}
        />
      ) : (
        <div className="iframe-error">
          <p>Unable to load content. Please try again later.</p>
          <button onClick={handleReload}>Reload</button>
        </div>
      )}
    </div>
  );
};

export default IframeWithError;
