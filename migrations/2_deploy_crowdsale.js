const AlphaCoin = artifacts.require("AlphaCoin");
const AlphaCoinCrowdsale = artifacts.require("AlphaCoinCrowdsale");

const ether = (n) => new web3.utils.BN(web3.utils.toWei(n, 'ether'));

module.exports = async function (deployer, network, accounts) {
    const _name = "Alpha Coin";
    const _symbol = "ALFA";
    const _decimals = 18;
    deployer.deploy(AlphaCoin, _name, _symbol, _decimals);
    const deployedToken = await AlphaCoin.deployed();

    const _rate = 500;
    const _wallet = accounts[0];
    const _token = deployedToken.address;
    const _cap = ether('100');

    await deployer.deploy(AlphaCoinCrowdsale, _rate, _wallet, _token, _cap);
    return true;
};
