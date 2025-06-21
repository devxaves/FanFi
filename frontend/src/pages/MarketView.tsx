import React, { useState, useEffect } from "react";
import {
  Typography,
  Radio,
  message,
  Card,
  Row,
  Col,
  Pagination,
  Tag,
  Button,
  Spin
} from "antd";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MARKET_PLACE_ADDRESS, MARKET_PLACE_NAME } from "../Constants";
import { useNavigate } from "react-router-dom";
import ConfirmPurchaseModal from "../components/ConfirmPurchaseModal";
import { truncateAddress } from "../utils/rarityUtils";
import { client } from "../utils/aptoClientUtil";

const { Title, Text } = Typography;
const { Meta } = Card;

// Category label and color mapping (1–4 used as rarity in backend)
const categoryLabels: Record<number, string> = {
  1: "Concert",
  2: "Sports",
  3: "Celebration",
  4: "Others",
};

const categoryColors: Record<number, string> = {
  1: "blue",
  2: "green",
  3: "purple",
  4: "volcano",
};

type NFT = {
  id: number;
  owner: string;
  name: string;
  description: string;
  uri: string;
  price: number;
  for_sale: boolean;
  rarity: number;
  auction: any;
};

const MarketView: React.FC = () => {
  const { account } = useWallet();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [category, setCategory] = useState<'all' | number>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNft, setSelectedNft] = useState<NFT | null>(null);
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);
  const pageSize = 8;
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchNfts(undefined);
  }, []);

  const handleFetchNfts = async (selectedCategory: number | undefined) => {
    try {
      setLoading(true);
      const response = await client.getAccountResource(
        MARKET_PLACE_ADDRESS,
        `${MARKET_PLACE_ADDRESS}::${MARKET_PLACE_NAME}::Marketplace`
      );

      const nftList = (response.data as { nfts: NFT[] }).nfts;

      const hexToUint8Array = (hex: string): Uint8Array => {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes;
      };

      const decodedNfts = nftList.map((nft) => {
        const auc = nft.auction?.vec ?? [];
        const auction = auc.length ? auc[0] : null;

        return {
          ...nft,
          owner: nft.owner.startsWith("0x") ? nft.owner : `0x${nft.owner}`,
          name: new TextDecoder().decode(hexToUint8Array(nft.name.slice(2))),
          description: new TextDecoder().decode(hexToUint8Array(nft.description.slice(2))),
          uri: new TextDecoder().decode(hexToUint8Array(nft.uri.slice(2))),
          price: nft.price / 1e8,
          auction: auction
            ? {
                end_time: auction.end_time,
                highest_bid: auction.highest_bid,
                highest_bidder: auction.highest_bidder,
                starting_price: auction.starting_price,
              }
            : null,
        };
      });

      const filtered = decodedNfts.filter((nft) =>
        (nft.for_sale || nft.auction) &&
        (selectedCategory === undefined || nft.rarity === selectedCategory)
      );

      setNfts(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      message.error("Failed to load NFTs.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = (nft: NFT) => {
    setSelectedNft(nft);
    setIsBuyModalVisible(true);
  };

  const paginatedNfts = nfts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <Title level={2} className="text-center">Marketplace</Title>
        <div className="flex-1 flex justify-center items-center">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <Title 
          level={1} 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          style={{ margin: '0 0 16px 0' }}
        >
          Trending Events
        </Title>
        <p className="text-gray-300 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
          All our featured trending events at one place by category
        </p>
      </div>

      {/* Enhanced Category Filters */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-4xl">
          <Radio.Group
            value={category}
            onChange={(e) => {
              const selected = e.target.value;
              setCategory(selected);
              handleFetchNfts(selected === 'all' ? undefined : selected);
            }}
            className="w-full"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {[
                { value: 'all', label: 'All', gradient: 'from-indigo-500 to-purple-600' },
                { value: 1, label: 'Concert', gradient: 'from-blue-500 to-cyan-500' },
                { value: 2, label: 'Sports', gradient: 'from-green-500 to-emerald-500' },
                { value: 3, label: 'Celebration', gradient: 'from-purple-500 to-pink-500' },
                { value: 4, label: 'Others', gradient: 'from-orange-500 to-red-500' },
              ].map((item) => (
                <Radio.Button 
                  key={item.value}
                  value={item.value}
                  className={`
                    relative overflow-hidden rounded-xl border-0 h-12 sm:h-14 
                    transition-all duration-300 ease-in-out transform hover:scale-105
                    ${category === item.value 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                      : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                    }
                  `}
                  style={{
                    fontFamily: 'Oxanium',
                    fontWeight: '600',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: '#111',
                    border: category === item.value ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span className="relative z-10 text-center leading-tight">
                    {item.label}
                  </span>
                  {category === item.value && (
                    <div className="absolute inset-0 bg-gradient-to-r opacity-20 animate-pulse" />
                  )}
                </Radio.Button>
              ))}
            </div>
          </Radio.Group>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {paginatedNfts.map((nft) => (
            <div
              key={nft.id}
              className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] group"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={nft.uri}
                  alt={`${nft.name} image`}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                
                {/* Rarity Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <div
                    className="px-2 py-1 text-xs sm:text-sm font-bold rounded-lg shadow-lg"
                    style={{ 
                      backgroundColor: categoryColors[nft.rarity],
                      color: 'white'
                    }}
                  >
                    {categoryLabels[nft.rarity]}
                  </div>
                </div>

                {/* Heart Icon */}
                <div className="absolute top-3 right-3 z-20 bg-black/30 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-black/50 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section */}
              <div className="p-3 sm:p-4">
                {/* Owner Info Section */}
                <div className="mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {nft.owner ? nft.owner.substring(2, 4).toUpperCase() : 'UN'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="text-lg sm:text-xl font-semibold text-white capitalize truncate"
                        style={{ fontFamily: 'Oxanium' }}
                      >
                        {nft.name}
                      </h3>
                      <p 
                        className="text-xs sm:text-sm font-light text-gray-300 truncate"
                        style={{ fontFamily: 'Poppins' }}
                      >
                        @{truncateAddress(nft.owner)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4 text-sm"  style={{ fontFamily: 'Oxanium' }}>
                  <div className="text-gray-200 font-medium mb-1">Description:</div>
                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {nft.description}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-400 text-xs">ID: {nft.id}</p>
                    <p className="text-gray-400 text-xs">
                      Owner: {nft.owner === account?.address && "You | "}
                      {truncateAddress(nft.owner)}
                    </p>
                  </div>
                </div>

                {/* Price and Status Section */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <span 
                      className="text-sm font-medium text-gray-300"
                      style={{ fontFamily: 'Oxanium' }}
                    >
                      {nft.auction ? 'Auction' : 'Available'}
                    </span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0112.12 15.12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <img src="./coin.webp" alt="coin" className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span 
                        className="text-sm font-semibold text-white"
                        style={{ fontFamily: 'Oxanium' }}
                      >
                        {nft.auction ? 'Auction' : `${nft.price} APT`}
                      </span>
                    </div>
                    {!nft.auction && (
                      <span 
                        className="text-xs text-gray-400"
                        style={{ fontFamily: 'Oxanium' }}
                      >
                        ($ {(Number(nft.price) * 10.5).toFixed(2)})
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="w-full">
                  {nft.auction ? (
                    <button
                      onClick={() => navigate(`/nft-detail/${nft.id}`)}
                      className="w-full h-10 sm:h-11 bg-transparent border-2 border-purple-500 text-purple-400 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all duration-200 text-sm sm:text-base"
                    >
                      Ongoing Auction
                    </button>
                  ) : nft.owner === account?.address ? (
                    <button
                      onClick={() => navigate(`/nft-detail/${nft.id}`)}
                      className="w-full h-10 sm:h-11 bg-transparent border-2 border-red-500 text-red-400 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all duration-200 text-sm sm:text-base"
                    >
                      End Sale
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuyClick(nft)}
                      className="w-full h-10 sm:h-11 bg-transparent border-2 border-purple-500 text-purple-400 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all duration-200 text-sm sm:text-base"
                    >
                      Buy NFT
                    </button>
                  )}
                </div>
              </div>

              {/* Click overlay for navigation */}
              <div 
                className="absolute inset-0 cursor-pointer z-0"
                onClick={() => navigate(`/nft-detail/${nft.id}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* No NFTs Message */}
      {nfts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">No NFTs found in this category</div>
          <div className="text-gray-500 text-sm">Try selecting a different category or check back later</div>
        </div>
      )}

      {/* Pagination */}
      {nfts.length > pageSize && (
        <div className="flex justify-center mt-8 mb-8">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={nfts.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="custom-pagination"
          />
        </div>
      )}

      {/* Buy Confirmation Modal */}
      <ConfirmPurchaseModal
        isVisible={isBuyModalVisible}
        onClose={() => setIsBuyModalVisible(false)}
        nftDetails={selectedNft}
        onRefresh={() => handleFetchNfts(undefined)}
      />
    </div>
  );
};

export default MarketView;