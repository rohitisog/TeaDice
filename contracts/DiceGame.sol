// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DiceGame {
    // Mapping from player address to score.
    mapping(address => uint256) public scores;
    // Array of players for leaderboard purposes.
    address[] public players;

    // Event emitted on every dice roll.
    event DiceRolled(address indexed player, uint256 diceResult, uint256 newScore);

    /**
     * @notice Rolls the dice and updates the player's score.
     * - 0 to 36: adds that number.
     * - 37 (STAR): doubles the score.
     * - 38 (GHOST): halves the score.
     */
    function rollDice() public returns (uint256) {
        // Pseudo-random number (not for production use)
        uint256 random = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))
        ) % 39;

        uint256 currentScore = scores[msg.sender];
        uint256 newScore;

        if (random == 37) {
            newScore = currentScore * 2;
        } else if (random == 38) {
            newScore = currentScore / 2;
        } else {
            newScore = currentScore + random;
        }
        scores[msg.sender] = newScore;

        if (!_playerExists(msg.sender)) {
            players.push(msg.sender);
        }
        emit DiceRolled(msg.sender, random, newScore);
        return random;
    }

    // Internal function to check if a player is already registered.
    function _playerExists(address _player) internal view returns (bool) {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i] == _player) {
                return true;
            }
        }
        return false;
    }

    /// @notice Returns the score for a given player.
    function getUserScore(address _player) public view returns (uint256) {
        return scores[_player];
    }

    /// @notice Returns an array of all players.
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
