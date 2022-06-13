const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('[UNSTOPPABLE AUCTION EXPLOIT]', async function () {
    let deployer, attacker

    const INITIAL_BID = ethers.utils.parseEther('10')

    before(async function () {
        // SET UP
        ;[deployer, attacker, alice, bob] = await ethers.getSigners()

        this.auction = await (
            await ethers.getContractFactory('UnstoppableAuction', deployer)
        ).deploy('0', ethers.constants.MaxUint256)

        await this.auction.connect(alice).bid({ value: INITIAL_BID })
    })

    it('Exploit', async function () {
        // YOUR EXPLOIT HERE

    })

    after(async function () {
        // SUCCESS CONDITIONS
        await expect(
            this.auction.connect(bob).bid({ value: INITIAL_BID.add(ethers.utils.parseEther('1')) })
        ).to.be.revertedWith("invalid balance")
    })
})
