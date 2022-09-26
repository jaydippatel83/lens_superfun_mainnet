const IPFS_ROOT = "https://gateway.ipfs.io/ipfs/";

export const resolveIPFS = (url) => {
  if (!url) {
    return url;
  }

  if (!url.includes("ipfs://") || !url) {
    return url;
  }

  return url.replace("ipfs://", IPFS_ROOT);
};