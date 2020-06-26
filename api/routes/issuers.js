const { NFT } = require('../models');

module.exports = {
  init(app) {
    app.get('/api/issuers', async (req, res) => {
      // badge
      const totalSendBadgeCount = await NFT.find({
        issuer: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC',
        owner: { $ne: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC' },
        type: { $in: 'NFTBadge' },
      }).count();
      // ticket
      const totalSendTicketCount = await NFT.find({
        issuer: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC',
        owner: { $ne: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC' },
        type: { $in: 'NFTTicket' },
      }).count();
      const totalSendFreeTicketCount = await NFT.find({
        issuer: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC',
        owner: { $ne: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC' },
        type: { $in: 'DevCon2020FreeTicket' },
      }).count();
      const totalSendProTicketCount = await NFT.find({
        issuer: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC',
        owner: { $ne: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC' },
        type: { $in: 'DevCon2020PaidTicket' },
      }).count();
      // certificate
      const totalSendFirstDayCertCount = await NFT.find({
        issuer: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC',
        owner: { $ne: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC' },
        type: { $in: 'DevCon2020SessionCertificate-0' },
      }).count();
      const totalSendSecondDayCertCount = await NFT.find({
        issuer: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC',
        owner: { $ne: 'zNKhZLG3rbjCoh7DC5NcVzBScEVkCyB35GcC' },
        type: { $in: 'DevCon2020SessionCertificate-1' },
      }).count();
      const totalSendCertCount = totalSendFirstDayCertCount + totalSendSecondDayCertCount;
      // total
      const totalSendCount = totalSendCertCount + totalSendBadgeCount + totalSendTicketCount;
      res.json({
        code: 0,
        msg: 'ok',
        result: {
          totalSendCount,
          totalSendBadgeCount,
          totalSendTicketCount,
          totalSendCertCount,
          totalSendFreeTicketCount,
          totalSendProTicketCount,
          totalSendFirstDayCertCount,
          totalSendSecondDayCertCount,
        },
      });
    });
  },
};
