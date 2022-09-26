
import './App.css';
import ArtistSlider from './components/ArtistSlider';
import TrendingSlider from './components/TrendingSlider'; 
import Header from './header/Header';
import Stories from './components/Stories';
import TopCreators from './components/TopCreators';
import Search from './components/Search';
import { Fragment, useEffect } from 'react';

function App() {


  // useEffect(() => {
  //   const connectorId = window.localStorage.getItem("connectorId");
  //   if (!window.ethereum) {
  //     enableWeb3({ provider: connectorId });
  //   }
  // }, [connectorId]);

  // asks the user for permission to change network to polygon mumbain testnet if other network is detected
  // useEffect(() => {
  //   if (window.ethereum) {
  //     (async () => {
  //       await window.ethereum.request({
  //         id: 1,
  //         jsonrpc: "2.0",
  //         method: "wallet_addEthereumChain",
  //         params: [
  //           {
  //             chainId: "0x89",
  //             rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
  //             chainName: "Polygon Mainnet",
  //             nativeCurrency: {
  //               name: "MATIC",
  //               symbol: "MATIC", // 2-6 characters long
  //               decimals: 18,
  //             },
  //             blockExplorerUrls: ["https://polygonscan.com/"],
  //           },
  //         ],
  //       });
  //     })();
  //   }
  // }, []);


  return (
    <div className='footer-position' style={{ marginTop: '100px' }}>
      <Header />
      <TopCreators/>
      {/* <Search/> */}
      <TrendingSlider/>
      {/* <ArtistSlider/>  */}
      <Stories/>
    </div>
  );
}

export default App;
