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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}>
        <Title level={2}>Marketplace</Title>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Title level={1} style={{ margin: 20 }}>Trending Events</Title>
<p className="mb-5">All our featured trending events at one place by category</p>
      {/* Category Filters */}
      <Radio.Group
  value={category}
  onChange={(e) => {
    const selected = e.target.value;
    setCategory(selected);
    handleFetchNfts(selected === 'all' ? undefined : selected);
  }}
  buttonStyle="solid"
  style={{ 
    marginBottom: 20,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center'
  }}
>
  <Radio.Button 
    value="all"
    style={{
      fontFamily: 'Oxanium',
      padding: '8px 24px',
      borderRadius: '12px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      background: 'linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#d1d5db',
      boxShadow: 'none'
    }}
  >
    All
  </Radio.Button>
  <Radio.Button 
    value={1}
    style={{
      fontFamily: 'Oxanium',
      padding: '8px 24px',
      borderRadius: '12px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      background: 'linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#d1d5db',
      boxShadow: 'none'
    }}
  >
    Concert
  </Radio.Button>
  <Radio.Button 
    value={2}
    style={{
      fontFamily: 'Oxanium',
      padding: '8px 24px',
      borderRadius: '12px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      background: 'linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#d1d5db',
      boxShadow: 'none'
    }}
  >
    Sports
  </Radio.Button>
  <Radio.Button 
    value={3}
    style={{
      fontFamily: 'Oxanium',
      padding: '8px 24px',
      borderRadius: '12px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      background: 'linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#d1d5db',
      boxShadow: 'none'
    }}
  >
    Celebration
  </Radio.Button>
  <Radio.Button 
    value={4}
    style={{
      fontFamily: 'Oxanium',
      padding: '8px 24px',
      borderRadius: '12px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      background: 'linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#d1d5db',
      boxShadow: 'none'
    }}
  >
    Others
  </Radio.Button>
</Radio.Group>


      {/* NFT Grid */}
      {/* <Row gutter={[24, 24]} style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
        {paginatedNfts.map((nft) => (
          <Col key={nft.id} xs={24} sm={12} md={8} lg={6} xl={6} style={{ display: "flex", justifyContent: "center" }}>
            <Card
              hoverable
              style={{ width: "100%", maxWidth: "240px" }}
              extra={
                <Tag color={categoryColors[nft.rarity]} style={{ fontSize: 14, fontWeight: "bold" }}>
                  {categoryLabels[nft.rarity]}
                </Tag>
              }
              cover={<img alt={nft.name} src={nft.uri} />}
              actions={[
                nft.auction ? (
                  <Button type="primary" onClick={() => navigate(`/nft-detail/${nft.id}`)}>
                    Ongoing Auction
                  </Button>
                ) : nft.owner === account?.address ? (
                  <Button danger type="primary" onClick={() => navigate(`/nft-detail/${nft.id}`)}>
                    End Sale
                  </Button>
                ) : (
                  <Button type="primary" onClick={() => handleBuyClick(nft)}>
                    Buy
                  </Button>
                )
              ]}
            >
              <div onClick={() => navigate(`/nft-detail/${nft.id}`)}>
                <Meta
                  title={<Text style={{ fontWeight: 500 }}>{nft.name}</Text>}
                  description={
                    nft.auction
                      ? <Text type="secondary">Price: Auction</Text>
                      : <Text type="secondary">Price: {nft.price} APT</Text>
                  }
                />
                <div style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  display: "-webkit-box",
                  marginTop: 4
                }}>
                  {nft.description}
                </div>
                <p>ID: {nft.id}</p>
                <p style={{ fontSize: 12 }}>
                  Owner: {nft.owner === account?.address && "You | "}
                  {truncateAddress(nft.owner)}
                </p>
              </div>
            </Card>

          </Col>
        ))}
      </Row> */}
      {/* NFT Grid */}
<div className="flex flex-wrap gap-6 justify-center items-center mt-5 w-full">
  {paginatedNfts.map((nft) => (
    <div
      key={nft.id}
      className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-0 overflow-hidden"
      style={{ width: '400px' }}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={nft.uri}
          alt={`${nft.name} image`}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        
        {/* Rarity Tag */}
        <div className="absolute top-0 left-0 z-10">
          <div
            className="px-3 py-1 text-sm font-bold rounded-br-2xl"
            style={{ 
              backgroundColor: categoryColors[nft.rarity],
              color: 'white'
            }}
          >
            {categoryLabels[nft.rarity]}
          </div>
        </div>

        {/* Heart Icon (if needed) */}
        <div className="absolute top-2 right-2 z-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3 cursor-pointer">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-4">
        {/* Owner Info Section */}
        <div className="py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
              {nft.owner ? nft.owner.substring(2, 4).toUpperCase() : 'UN'}
            </div>
            <div>
              <h3 
                className="text-2xl font-normal text-white capitalize"
                style={{ fontFamily: 'Oxanium' }}
              >
                {nft.name}
              </h3>
              <p 
                className="text-sm font-light text-gray-300 lowercase"
                style={{ fontFamily: 'Poppins' }}
              >
                @{truncateAddress(nft.owner)}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 flex flex-col items-start text-base "  style={{ fontFamily: 'Oxanium' }}>
          Description :
          <span className="text-gray-300 mx-3 overflow-hidden">
            {nft.description}
          </span>
          <p className=" text-gray-400 mt-1">ID: {nft.id}</p>
          <p className=" text-gray-400">
            Owner: {nft.owner === account?.address && "You | "}
            {truncateAddress(nft.owner)}
          </p>
        </div>

        {/* Price and Status Section */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <span 
              className="text-base font-light text-gray-300"
              style={{ fontFamily: 'Oxanium' }}
            >
              {nft.auction ? 'Auction' : 'Available'}
            </span>
            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0112.12 15.12z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <img src="./coin.webp" alt="coin" className="w-4 h-4" />
              <span 
                className="text-sm font-normal text-white"
                style={{ fontFamily: 'Oxanium' }}
              >
                {nft.auction ? 'Auction' : `${nft.price} APT`}
              </span>
            </div>
            {!nft.auction && (
              <span 
                className="text-xs font-normal text-gray-400"
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
              className="w-full h-11 bg-transparent border-2 border-purple-500 text-purple-400 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all duration-200 capitalize"
            >
              Ongoing Auction
            </button>
          ) : nft.owner === account?.address ? (
            <button
              onClick={() => navigate(`/nft-detail/${nft.id}`)}
              className="w-full h-11 bg-transparent border-2 border-red-500 text-red-400 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all duration-200 capitalize"
            >
              End Sale
            </button>
          ) : (
            <button
              onClick={() => handleBuyClick(nft)}
              className="w-full h-11 bg-transparent border-2 border-purple-500 text-purple-400 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all duration-200 capitalize"
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

      {/* Pagination */}
      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={nfts.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Buy Confirmation */}
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
