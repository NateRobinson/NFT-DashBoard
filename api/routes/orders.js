module.exports = {
  init(app) {
    app.get('/api/orders', async (req, res) => {
      res.json({
        code: 0,
        msg: 'ok',
      });
    });
  },
};
