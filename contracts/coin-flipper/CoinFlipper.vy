# @version ^0.3.2

"""
@title Coin Flipper
@author jtriley.eth
"""

interface Rng:
    def generate_random_number() -> uint256: nonpayable


event Winner:
    account: indexed(address)
    amount: uint256


generator: public(address)

cost: constant(uint256) = 10 ** 18


@external
@payable
def flip_coin(guess: bool):
	assert msg.value == cost, "not free to play"

	side: bool = Rng(self.generator).generate_random_number() % 2 == 0

	if side == guess:

		amount: uint256 = cost * 2

		send(msg.sender, amount)

		log Winner(msg.sender, amount)
