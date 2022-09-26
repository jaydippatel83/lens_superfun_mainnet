const privateKey1 = 'a3993474ed56a2a6304ae3e920a5cb86d80ccf20adfcec95ff1b6fa276d6ff74'
const MUMBAI_RPC_URL='https://rpc-mumbai.matic.today'


module.exports = {
    defaultNetwork: "rinkeby",
    networks: {
      hardhat: {
      },
      rinkeby: {
        url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
        accounts: [privateKey1]
      },
      matic:{
        url: MUMBAI_RPC_URL,
        accounts: [privateKey1]
      }
    },
    solidity: {
      version: "0.8.10",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
    paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts"
    },
    mocha: {
      timeout: 40000
    }
  }