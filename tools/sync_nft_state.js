/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const ForgeSDK = require('@arcblock/forge-sdk');
const env = require('../api/libs/env');
const { NFT } = require('../api/models');

ForgeSDK.connect(env.chainHost, { chainId: env.chainId, name: env.chainId, default: true });

let isConnectedBefore = false;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, autoReconnect: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('disconnected', () => {
  console.log('Lost MongoDB connection...');
  if (!isConnectedBefore) {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, autoReconnect: true });
  }
});
mongoose.connection.on('connected', () => {
  isConnectedBefore = true;
  console.log('Connection established to MongoDB');
});
mongoose.connection.on('reconnected', () => {
  console.log('Reconnected to MongoDB');
});

const handleTxs = async (txs) => {
  const waitInsertNFTs = [];
  for (let i = 0; i < txs.length; i++) {
    const assetAddress = txs[i].tx.itxJson.address;
    const assetState = await ForgeSDK.getAssetState({ address: assetAddress });
    if (assetState.code === 'OK') {
      const assetValue = JSON.parse(assetState.state.data.value);
      const nft = new NFT({
        address: assetAddress,
        name: assetState.state.moniker,
        type: assetValue.type,
        customType: assetValue.type[0],
        customCategory: assetValue.type[0].split('-')[0],
        owner: assetState.state.owner,
        issuer: assetState.state.issuer,
        issuerName: assetValue.issuer.name,
        transferable: assetState.state.transferrable,
        createdAt: new Date(assetState.state.context.genesisTime),
      });
      waitInsertNFTs.push(nft);
    }
  }
  try {
    NFT.collection.insert(waitInsertNFTs, (err, docs) => {
      if (err) {
        console.error('insert nfts error');
      } else {
        console.info('%d nfts were successfully stored.', docs.result.n);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  try {
    const pageSize = 10;
    const totalCount = await NFT.find().count();
    const totalPageSize = parseInt(totalCount / pageSize, 10) + 1;
    for (let i = 0; i < totalPageSize; i++) {
      const nfts = await NFT.find()
        .skip(i * pageSize)
        .limit(pageSize);
      for (let j = 0; j < nfts.length; j++) {
        const assetAddress = nfts[j].address;
        const assetState = await ForgeSDK.getAssetState({ address: assetAddress });
        if (assetState.code === 'OK') {
          const assetValue = JSON.parse(assetState.state.data.value);
          NFT.updateOne({ address: assetAddress }, {
            address: assetAddress,
            name: assetState.state.moniker,
            type: assetValue.type,
            customType: `${assetValue.type[0]}`,
            customCategory: assetValue.type[0].split('-')[0],
            owner: assetState.state.owner,
            issuer: assetState.state.issuer,
            issuerName: assetValue.issuer.name,
            transferable: assetState.state.transferrable,
            createdAt: new Date(assetState.state.context.genesisTime),
          }, (err, docs) => {
            if (err) {
              console.error(`NFT: ${assetAddress} update error`);
            } else if (docs.nModified === 1) {
              console.log(`NFT: ${assetAddress} be updated`);
            } else {
              console.log(`NFT: ${assetAddress} skip`);
            }
          });
        }
      }
    }
    console.error('******** sync finish ********');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
