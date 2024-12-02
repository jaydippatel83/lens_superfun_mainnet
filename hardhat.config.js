const privateKey1 = process.env.PRIVATE_KEY;
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
