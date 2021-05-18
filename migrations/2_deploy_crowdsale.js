const AlphaCoin = artifacts.require("AlphaCoin");

module.exports = function (deployer) {
    const _name = "Alpha Coin";
    const _symbol = "ALFA";
    const _decimals = 18;
    deployer.deploy(AlphaCoin, _name, _symbol, _decimals);
};
