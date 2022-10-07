 
import { gql } from '@apollo/client'
import { toast } from 'react-toastify'
import { apolloClient } from '../services/Apollo_Client'
import { getAddress } from '../services/ethers-service'

const FREE_FOLLOW = `
mutation ProxyAction {
    proxyAction(request: {
      follow: {
        freeFollow: {
          profileId: "0x01"
        }
      }
    })
  }
`

export const freeFollow = (req) => {
   return apolloClient.query({
    query: gql(FREE_FOLLOW),
    variables: {
      request: {
        address: req, 
      },
    },
  })
}

export const proxyActionStatusRequest = async (proxyActionId) => {
    const result = await apolloClient.query({
      query: gql(FREE_FOLLOW),
      variables: {
        proxyActionId,
      },
    });
  
    return result.data.proxyActionStatus;
  };


export const proxyActionFreeFollow = async (data) => {
    
    const address =  getAddress();
    console.log('proxy action free follow: address', address);
  
    await data.login(address);
  
    const result = await freeFollow({
      follow: {
        freeFollow: {
          profileId:data.followId,
        },
      },
    });
    console.log('proxy action free follow: result', result);

    while (true) {
        const statusResult = await proxyActionStatusRequest(result);
        console.log('proxy action free follow: status', statusResult);
        if (statusResult.__typename === 'ProxyActionStatusResult') {
            console.log(statusResult,"statusResult");
        //   if (statusResult.status === ProxyActionStatusTypes.Complete) {
        //      toast.success('proxy action free follow: complete', statusResult);
        //     break;
        //   }
        }
        if (statusResult.__typename === 'ProxyActionError') {
          console.log('proxy action free follow: failed', statusResult);
          break;
        }
        // await sleep(1000);
      }
    
      return result;
  
}