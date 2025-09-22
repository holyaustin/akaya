import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div style={styles.container}>
      {/* Landing Page Caption */}
      <h1 style={styles.title}>Akaya Farcaster Mini App</h1>

      {/* Card Section */}
      <div style={styles.card}>
        <ConnectMenu />
      </div>
    </div>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <div style={styles.section}>
        <p style={styles.text}>✅ Connected account:</p>
        <p style={styles.code}>{address}</p>
        <SignButton />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => connect({ connector: connectors[0] })}
      style={styles.connectButton}
    >
      Connect
    </button>
  );
}

function SignButton() {
  const { signMessage, isPending, data, error } = useSignMessage();

  return (
    <div style={styles.section}>
      <button
        type="button"
        onClick={() => signMessage({ message: "Welcome to Akaya Mini app" })}
        disabled={isPending}
        style={{
          ...styles.connectButton,
          opacity: isPending ? 0.6 : 1,
          cursor: isPending ? "not-allowed" : "pointer",
        }}
      >
        {isPending ? "Signing..." : "Sign message"}
      </button>

      {data && (
        <div>
          <p style={styles.textBold}>Signature</p>
          <p style={styles.code}>{data}</p>
        </div>
      )}

      {error && (
        <div>
          <p style={{ ...styles.textBold, color: "#ffcccc" }}>Error</p>
          <p style={styles.text}>{error.message}</p>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom right, #1e3a8a, #1e40af)", // blue gradient
    color: "#FFD700", // yellow text
    padding: "1rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
  },
  card: {
    backgroundColor: "rgba(30, 58, 138, 0.9)", // deep blue box
    borderRadius: "16px",
    padding: "2rem",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
  },
  connectButton: {
    width: "100%",
    padding: "1rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "#FFD700", // yellow
    color: "#1e3a8a", // dark blue text
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  section: {
    marginTop: "1.5rem",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  textBold: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  code: {
    wordBreak: "break-all" as const,
    backgroundColor: "#1e3a8a",
    color: "#FFD700",
    padding: "0.5rem",
    borderRadius: "8px",
    fontFamily: "monospace",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
};

export default App;
