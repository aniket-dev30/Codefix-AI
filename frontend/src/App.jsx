import { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const handleDebug = async () => {
    try {
      console.log("Button clicked");

      const res = await axios.post("http://localhost:5000/debug", {
        code,
        language: "javascript",
      });

      console.log("Response:", res.data);
      setResult(res.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <h1 style={{ textAlign: "center", fontSize: "40px" }}>
        AI Code Debugger 🐞
      </h1>

      {/* Main Layout */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          height: "75vh",
        }}
      >
        {/* LEFT - INPUT */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3>Enter Code</h3>

          <textarea
            style={{
              flex: 1,
              width: "100%",
              background: "#1e293b",
              color: "white",
              borderRadius: "10px",
              padding: "10px",
              border: "none",
              outline: "none",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            onClick={handleDebug}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: "#22c55e",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Debug Code
          </button>
        </div>

        {/* RIGHT - OUTPUT */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3>Debug Output</h3>

          {result ? (
            <div
              style={{
                flex: 1,
                background: "#1e293b",
                padding: "15px",
                borderRadius: "10px",
                overflowY: "auto",
              }}
            >
              <h4 style={{ color: "#f87171" }}>Errors:</h4>
              <p>{JSON.stringify(result.errors)}</p>

              <h4 style={{ color: "#4ade80" }}>Fixed Code:</h4>
              <pre
                style={{
                  background: "#0f172a",
                  padding: "10px",
                  borderRadius: "6px",
                  overflowX: "auto",
                }}
              >
                {result.fixedCode}
              </pre>

              <h4 style={{ color: "#60a5fa" }}>Explanation:</h4>
              <p>{result.explanation}</p>
            </div>
          ) : (
            <p style={{ opacity: 0.6 }}>No result yet...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;