import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from "./contracts/abi.json"
import {bytecode} from "./contracts/bytecode"

function App() {

  const [provider,setProvider] = useState(null)
  const [network, setNetwork] = useState('');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        console.log({provider});
        setProvider(provider);
      }

    }
    initProvider()
  },[])

  useEffect(() => {
    const getNetwork = async () => {
      if (provider) {
        const network = await provider.getNetwork();
        setNetwork(network.name);
      }
    };

    const deployContract = async () => {
      if (provider) {
        const signer = await  provider.getSigner();
        const ContractFactory = new ethers.Contract('0xA755c3967c3b5a0a1817EB52F1D0d297B2AAeB1e',abi, signer);
        console.log({ContractFactory:ContractFactory.getAddress()});
        setContract(ContractFactory);
      }
    };
    deployContract();
    getNetwork();
  },[provider])

  console.log(network);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
