/* eslint-disable arrow-parens */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
require('dotenv').config();

// eslint-disable-next-line import/no-extraneous-dependencies
const ForgeSDK = require('@arcblock/forge-sdk');
const env = require('../api/libs/env');
const { NFT, User } = require('../api/models');

ForgeSDK.connect(env.chainHost, { chainId: env.chainId, name: env.chainId, default: true });

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
      console.log(nft);
      waitInsertNFTs.push(nft);
      try {
        await nft.save();
      } catch (error) {
        console.error(error);
      }
      console.log('1111');
    }
  }
  // try {
  //   NFT.collection.insert(waitInsertNFTs, (err, docs) => {
  //     if (err) {
  //       console.error('insert nfts error');
  //     } else {
  //       console.info('%d nfts were successfully stored.', docs.length);
  //     }
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
};

(async () => {
  try {
    console.log('8888');
    const user = new User({
      did: '11111',
      name: '222222',
    });
    await user.save();
    let totalSize = 0;
    const totalSizeResult = await ForgeSDK.listTransactions(
      {
        typeFilter: { types: ['create_asset'] },
        paging: { size: 1 },
      },
      { ignoreFields: [/\.tx.itx/] }
    );
    if (totalSizeResult.code === 'OK') {
      totalSize = totalSizeResult.page.total;
    }
    let cursor = '';
    const pageSize = 10;
    const totalRequestTime = parseInt(totalSize / pageSize, 10) + 1;
    const errorCursors = [];

    for (let i = 0; i < totalRequestTime; i++) {
      console.info(`****start sync:cursor:${cursor}********`);
      const createAssetTxsResult = await ForgeSDK.listTransactions({
        typeFilter: { types: ['create_asset'] },
        paging: { cursor, size: pageSize },
      });
      if (createAssetTxsResult.code === 'OK') {
        const txs = createAssetTxsResult.transactions;
        await handleTxs(txs);
        cursor = createAssetTxsResult.page.cursor;
        const next = createAssetTxsResult.page.next;
        if (!next) {
          console.error('sync create tx finish');
          break;
        }
      } else {
        errorCursors.push(cursor);
      }
    }
    if (errorCursors.length > 0) {
      console.log(`sync create tx list error with cursors: ${errorCursors}`);
    }
    console.error('******** sync finish ********');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
