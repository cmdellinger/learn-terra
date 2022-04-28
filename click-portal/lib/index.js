module.exports = ({ wallets, refs, config, client }) => ({
  getScore: () => client.query("clicker", { get_score: {} }),

  getScores: () => client.query("clicker", { get_scores: {} }),

  upsertScore: (score, signer = wallets.validator) =>
    client.execute(signer, "clicker", { upsert_score: { score } }),
});