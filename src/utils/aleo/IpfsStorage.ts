import { NFTStorage } from "nft.storage";

const key = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;

const NFTStorageClient = new NFTStorage({
    token: key || "undefined",
});

export const storeMetadataToIPFS = async (metadata: any) => {
    console.info("Storing Metadata to IPFS...");
    const token = await NFTStorageClient.store(metadata);
    console.info("Success! Metadata IPFS URL:", token.url);
    return token.url;
};

export const createMomentSwapMetadata = (owner: string, contentText: string, media?: any) => {
    return {
        name: "MomentSwap Hyperspace NFTs 2023",
        description: contentText,
        image: new Blob(),
        properties: {
            authors: [{ addres: owner }],
            content: {
                "text/markdown": contentText,
            },
            media: {
                cid: media?.cid,
                type: media?.type,
            },
        },
    };
};