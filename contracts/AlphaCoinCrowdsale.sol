pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
// import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";

contract AlphaCoinCrowdsale is
    Crowdsale,
    MintedCrowdsale,
    CappedCrowdsale,
    WhitelistedCrowdsale
{
    // Track investor contributions
    uint256 public investorMinCap = 2000000000000000; // 0.002 Eth
    uint256 public investorHardCap = 50000000000000000000; // 5 Eth

    mapping(address => uint256) public contributions;

    constructor(
        uint256 _rate,
        address _wallet,
        ERC20 _token,
        uint256 _cap
    ) public Crowdsale(_rate, _wallet, _token) CappedCrowdsale(_cap) {}

    function getUserContribution(address _beneficiary)
        public
        view
        returns (uint256)
    {
        return contributions[_beneficiary];
    }

    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount)
        internal
    {
        super._preValidatePurchase(_beneficiary, _weiAmount);
        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_weiAmount);
        require(
            _newContribution >= investorMinCap &&
                _newContribution <= investorHardCap
        );

        contributions[_beneficiary] = _newContribution;
    }
}
