import { gql } from "@apollo/client/core";
import { apolloClient } from "../services/Apollo_Client";

const HAS_TX_BEEN_INDEXED = `
  query($request: HasTxHashBeenIndexedRequest!) {
    hasTxHashBeenIndexed(request: $request) { 
	    ... on TransactionIndexedResult {
            indexed
            txReceipt {
                to
                from
                contractAddress
                transactionIndex
                root
                gasUsed
                logsBloom
                blockHash
                transactionHash
                blockNumber
                confirmations
                cumulativeGasUsed
                effectiveGasPrice
                byzantium
                type
                status
                logs {
                    blockNumber
                    blockHash
                    transactionIndex
                    removed
                    address
                    data
                    topics
                    transactionHash
                    logIndex
                }
            }
            metadataStatus {
              status
              reason
            }
        }
        ... on TransactionError {
            reason
            txReceipt {
                to
                from
                contractAddress
                transactionIndex
                root
                gasUsed
                logsBloom
                blockHash
                transactionHash
                blockNumber
                confirmations
                cumulativeGasUsed
                effectiveGasPrice
                byzantium
                type
                status
                logs {
                    blockNumber
                    blockHash
                    transactionIndex
                    removed
                    address
                    data
                    topics
                    transactionHash
                    logIndex
             }
            }
        },
        __typename
    }
  }
`;

const hasTxBeenIndexed = (txHash) => {
  return apolloClient.query({
    query: gql(HAS_TX_BEEN_INDEXED),
    variables: {
      request: {
        txHash,
      },
    },
    fetchPolicy: "network-only",
  });
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const pollUntilIndexed = async (txHash) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = await hasTxBeenIndexed(txHash);

    const response = result.data.hasTxHashBeenIndexed;  
    if (response.__typename === "TransactionIndexedResult") { 

      if (response.metadataStatus) {
        if (response.metadataStatus.status === "SUCCESS") {
          return response;
        }

        if (response.metadataStatus.status === "METADATA_VALIDATION_FAILED") {
          throw new Error(response.metadataStatus.reason);
        }
      } else {
        if (response.indexed) {
          return response;
        }
      }

      // sleep for a second before trying again
      await sleep(1000);
    } else {
      // it got reverted and failed!
      throw new Error(response.reason);
    }
  }
};