import './App.css';
//Bring in the required hooks and possible wallet states
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import Menu from './components/Menu';

function App() {
    // Current wallet status, connect & disconnect functions, available connections
    const { status, connect, disconnect, availableConnectTypes } = useWallet();

    const renderConnectButton = () => {
      if (status === WalletStatus.WALLET_NOT_CONNECTED) {
        return (
          <div className="connect-wallet-div">
            <button
              type="button"
              key={`connect-EXTENSION`}
              onClick={() => connect("EXTENSION")}
              className="cta-button connect-wallet-button"
            >
              Connect wallet
            </button>
          </div>
        );
      }
      // Check if wallet is connect
      else if (status === WalletStatus.WALLET_CONNECTED) {
        return (
          <button
            type="button"
            onClick={() => disconnect()}
            className="cta-button connect-wallet-button"
          >
            Disconnect
          </button>
        );
      }
    };
    
    // Let's take a look at what the starting states are!
    console.log("Wallet status is ", status);
    console.log("Available connection types:", availableConnectTypes);

    return (
      <main className="App">
        <header>
          <div className="header-titles">
            <h1>⚒️ Whack-A-Mole ⚒️</h1>
            <p>Only you can save the golf course</p>
          </div>
  
        </header>
  
        {/* If not connected, show the goblin GIF! */}
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <div>
            <iframe title="cat-gif" src="https://giphy.com/embed/ebITvSXYKNvRm" width="480" height="440" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
          </div>
        )}
  
        {/* Show the menu after connection */}
        {status === WalletStatus.WALLET_CONNECTED && (
            <div className="game-menu-container">
              <Menu />
            </div>
          )}
          
  
        {renderConnectButton()}
      </main>
    );
  }

export default App;
