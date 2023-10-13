import React from "react";
import ReactDOM from "react-dom/client";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig, useAccount, useSignMessage } from "wagmi";
import { mainnet } from "wagmi/chains";
import "./index.css";

// 1. Get projectId
const projectId = "2a2a5978a58aad734d13a2d194ec469a";

// 2. Create wagmiConfig
const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: "Web3Modal 3.1.0",
  },
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

// 4. Create modal
const App = () => {
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "gm from ETHOnline",
  });

  const { address } = useAccount();
  return (
    <>
      <div className="container">
        <w3m-button />
        <w3m-network-button />
      </div>
      <p>
        {address && (
          <>
            <b>Address:</b> {address}
          </>
        )}
      </p>
      {address && (
        <div>
          <button disabled={isLoading} onClick={() => signMessage()}>
            Sign message
          </button>
          {isSuccess && <div>Signature: {data}</div>}
          {isError && <div>Error signing message</div>}
        </div>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
);
