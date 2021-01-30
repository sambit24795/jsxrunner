import React, { useRef, useEffect } from "react";

import "./preview.css";

interface IPreviewProps {
  code: string;
  error: string;
}

const html = `
  <html>
    <head>
    <style>
    body {
      font-family: "Victor Mono";
    }
    </style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>'+  err + '</div>';
            console.error(err);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err)
          }
        }, false);
      </script>
    </body>
  </html>
`;

const Preview: React.FunctionComponent<IPreviewProps> = ({ code, error }) => {
  const iFrame = useRef<any>();

  useEffect(() => {
    iFrame.current.srcdoc = html;
    setTimeout(() => {
      iFrame.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iFrame}
        sandbox="allow-scripts"
        srcDoc={html}
        title="displayCode"
      />
      {error && <div className="preview-error"><h4>Compilation Error</h4>{error}</div>}
    </div>
  );
};

export default Preview;
