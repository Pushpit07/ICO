require('web3');

const AlphaCoin = artifacts.require("AlphaCoin");
const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('AlphaCoin', accounts => {

    const _name = 'Alpha Coin';
    const _symbol = 'ALFA';
    const _decimals = 18;

    beforeEach(async function () {
        this.token = await AlphaCoin.new(_name, _symbol, _decimals);
    })

    describe('token attributes', function () {
        it('has the correct name', async function () {
            const name = await this.token.name();
            name.should.equal(_name);
        });
        it('has the correct symbol', async function () {
            const symbol = await this.token.symbol();
            symbol.should.equal(_symbol);
        });
        it('has the correct decimals', async function () {
            const decimals = await this.token.decimals();
            decimals.toString().should.be.bignumber.equal(_decimals);
        });
    });

});