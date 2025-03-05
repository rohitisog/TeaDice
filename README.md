# Roll Dice Game - Solidity & React (ethers.js) 🎲

## Project Overview
The **Roll Dice Game** is a blockchain-based luck game where players roll a dice (0-36, ⭐, 👻) up to **5 times per day** to earn points. Players can progress through different **milestone tiers** (Bronze, Silver, Gold, Platinum, Diamond, OG) based on their accumulated points. The game is built using:

- **Solidity**: Smart contract logic for dice rolls, point calculation, milestone tracking, and daily resets.
- **React (ethers.js)**: Frontend for **wallet connection, dice rolling, real-time stats**, and **contract interactions**.
- **MetaMask & Ethereum**: Users sign transactions using MetaMask.

## Game Rules & Mechanics

1️⃣ **Each player can roll the dice up to 5 times per day**. Rolls reset at **UTC 00:00**.
2️⃣ The dice generates a number from **0 to 36** or a **special icon**:  
   - **0** → Resets points to **zero** & eliminates the player for that day.  
   - **⭐ (Star)** → **Doubles** the previous points.  
   - **👻 (Ghost)** → **Halves** the previous points.  
   - **1-36** → Adds the rolled number to the player’s total score.  
3️⃣ Players earn **milestones** based on their score:
   - **Bronze** (250 points) - Max **250,000** passes  
   - **Silver** (500 points) - Max **125,000** passes  
   - **Gold** (900 points) - Max **50,000** passes  
   - **Platinum** (1,800 points) - Max **25,000** passes  
   - **Diamond** (3,600 points) - Max **12,500** passes  
   - **OG** (5,000 points) - Max **1,000** passes  
4️⃣ Once a milestone limit is reached, **no more players can claim that tier**.

## Additional Features

🎟 **Raffle Lottery (Luck-Based)**
- Players get **2 turns daily**, but **each entry costs 20 points**.
- Winning points range **between 1-100**.

📅 **Daily Check-In Rewards**
- **30 Days** → Gold Pass (5,000 points)
- **60 Days** → Platinum Pass (2,000 points)
- **90 Days** → OG Pass (1,000 points)

## Technical Features

✅ **Solidity Smart Contract**
- Stores player data (points, rolls, elimination status)
- Implements fair dice roll logic using `keccak256` hashing
- Tracks milestone achievements & limits claims
- Automatically resets daily rolls for players at UTC 00:00

✅ **React Frontend (ethers.js, No Wagmi)**
- **MetaMask Wallet Connection**
- **Real-time Player Stats (Points, Rolls Left, Milestones)**
- **Interact with the Smart Contract using ethers.js**
- **Dice Roll Button (Disabled if eliminated or out of rolls)**

✅ **Blockchain Security & Fairness**
- **On-chain RNG (Random Number Generation)** for fair rolls
- **Immutable smart contract logic** ensures no manipulation

## Future Enhancements

🃏 **NFT Collection (Dice-Based)**
- **Minting available only to Platinum, Diamond, and OG holders**.

🔥 **Testnet Performance → Whitelist NFT → Testnet NFT Minting**

## Feedback & Open Questions:

**What happens when rolls are 0?**  
→ No more turns for that day. Open to suggestions for alternatives.

**What is a milestone?**  
→ Defined points thresholds unlocking different phases (Bronze → OG).

**How to make it more interactive?**  
→ Possible additions: leaderboard, streak-based bonuses, or unique dice effects.

🎲 **Ready to roll the dice?** Connect your wallet & test your luck! 🔥

