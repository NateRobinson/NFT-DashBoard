/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const { NFT } = require('../models');

module.exports = {
  init(app) {
    app.get('/api/sorts', async (req, res) => {
      const sortResult = await NFT.aggregate([
        {
          $match: {
            owner: { $ne: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC' },
          },
        },
        {
          $group: {
            _id: '$owner',
            total: { $sum: 1 },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
      ]).limit(10);

      const result = [];
      for (let i = 0; i < sortResult.length; i++) {
        const item = sortResult[i];
        const totalTicketCount = await NFT.find({
          owner: item._id,
          type: { $in: 'NFTTicket' },
        }).count();
        const totalBadgeCount = await NFT.find({
          owner: item._id,
          type: { $in: 'NFTBadge' },
        }).count();
        const totalCertificateCount = await NFT.find({
          owner: item._id,
          type: { $in: 'NFTCertificate' },
        }).count();
        result.push({ ...item, totalTicketCount, totalBadgeCount, totalCertificateCount });
      }

      res.json({
        code: 0,
        msg: 'ok',
        result,
      });
    });
  },
};
