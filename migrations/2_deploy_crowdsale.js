const NomadToken = artifacts.require("NomadToken");

module.exports = function (deployer) {
    const _name = "Nomad Token";
    const _symbol = "NTK";
    const _decimals = 18;
    deployer.deploy(NomadToken, _name, _symbol, _decimals);
};
