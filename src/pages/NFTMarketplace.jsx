import React from "react";
import { motion } from "framer-motion";

const dummyNFTs = [
  {
    id: 1,
    name: "mDice 1",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "0.1 MON",
  },
  {
    id: 2,
    name: "mDice 2",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "0.2 MON",
  },
  {
    id: 3,
    name: "mDice 3",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "0.3 MON",
  },
  {
    id: 4,
    name: "mDice 4",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "0.4 MON",
  },
  {
    id: 5,
    name: "mDice 5",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "0.5 MON",
  },
  {
    id: 6,
    name: "mDice 6",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "0.6 MON",
  },
  {
    id: 7,
    name: "mDice 7",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "0.7 MON",
  },
  {
    id: 8,
    name: "mDice 8",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "0.8 MON",
  },
  {
    id: 9,
    name: "mDice 9",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "0.9 MON",
  },
  {
    id: 10,
    name: "mDice 10",
    img: "https://images.piclumen.com/normal/20250227/21/1b593bd20e5c4e199573ea49b1b06f04.webp",
    price: "1.0 MON",
  },
];

const NFTMarketplace = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-4xl mb-8 uppercase">NFT MARKETPLACE</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
        {dummyNFTs.map((nft) => (
          <motion.div
            key={nft.id}
            className="border border-white p-4 rounded text-center"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={nft.img}
              alt={nft.name}
              className="mx-auto mb-4 w-full h-48 object-cover rounded"
            />
            <div className="flex items-center justify-between space-x-4">
              <h3 className="text-2xl uppercase">{nft.name}</h3>
              <p className="uppercase">{nft.price}</p>
              <button className="bg-[#f50db4] px-4 py-2 rounded uppercase">
                BUY
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NFTMarketplace;
