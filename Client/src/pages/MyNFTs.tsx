import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Pagination,
  message,
  Button,
  Tag,
  Spin,
} from "antd";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MARKET_PLACE_ADDRESS, MARKET_PLACE_NAME } from "../Constants";
import { useNavigate } from "react-router-dom";
import StartAuctionModal from "../components/StartAuctionModal";
import ListForSaleModal from "../components/ListForSaleModal";
import { fetchNFTDataUtil } from "../utils/fetchNFTData";
import { NFT } from "../types/nftType";
import { client } from "../utils/aptoClientUtil";
import { QRCodeCanvas } from "qrcode.react";

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

const { Title, Text } = Typography;
const { Meta } = Card;

const truncateAddress = (address: string, start = 6, end = 4) => {
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

const MyNFTs: React.FC = () => {
  const pageSize = 8;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const { account } = useWallet();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuctionModalVisible, setIsAuctionModalVisible] = useState(false);
  const [selectedNft, setSelectedNft] = useState<NFT | null>(null);

  const fetchUserNFTs = useCallback(async () => {
    if (!account) return;
    try {
      setLoading(true);
      const response = await client.view({
        function: `${MARKET_PLACE_ADDRESS}::${MARKET_PLACE_NAME}::get_all_nfts_for_owner`,
        arguments: [MARKET_PLACE_ADDRESS, account.address, "100", "0"],
        type_arguments: [],
      });

      const nftIds = Array.isArray(response[0]) ? response[0] : response;
      setTotalNFTs(nftIds.length);

      if (!nftIds.length) {
        setNfts([]);
        return;
      }

      const fetched = await Promise.all(
        nftIds.map((id) => fetchNFTDataUtil(id, account.address, client))
      );

      const userNFTs = fetched.filter((nft): nft is NFT => nft !== null);
      setNfts(userNFTs);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      message.error("Failed to fetch your NFTs.");
    } finally {
      setLoading(false);
    }
  }, [account]);

  useEffect(() => {
    fetchUserNFTs();
  }, [fetchUserNFTs, currentPage]);

  const handleSellClick = (nft: NFT) => {
    setSelectedNft(nft);
    setIsModalVisible(true);
  };

  const handleAuctionClick = (nft: NFT) => {
    setSelectedNft(nft);
    setIsAuctionModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedNft(null);
  };

  const handleAuctionModalClose = () => {
    setIsAuctionModalVisible(false);
    setSelectedNft(null);
  };

  const paginatedNFTs = nfts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", margin:20 }}>
      <Title level={1}>My Ticket Wallet</Title>
      <p className="mb-5">Your event-based NFT tickets with check-in QR codes.</p>

      {/* <Row gutter={[24, 24]} style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
        {paginatedNFTs.map((nft) => (
          <Col key={nft.id} xs={24} sm={12} md={8} lg={8} xl={6} style={{ display: "flex", justifyContent: "center" }}>
            <Card
              hoverable
              style={{ width: "100%", maxWidth: 280, minWidth: 220 }}
              extra={
                <Tag color={categoryColors[nft.rarity]} style={{ fontSize: 14, fontWeight: "bold" }}>
                  {categoryLabels[nft.rarity]}
                </Tag>
              }
              cover={<img alt={nft.name} src={nft.uri} />}
              actions={[
                <div style={{ display: "flex", justifyContent: "space-evenly" }} key="actions">
                  {nft.auction ? (
                    <Button
                      type="primary"
                      disabled={nft.auction?.isExpired}
                      onClick={() => navigate(`/nft-detail/${nft.id}`)}
                    >
                      {nft.auction?.isExpired ? "Expired Auction" : "Ongoing Auction"}
                    </Button>
                  ) : nft.for_sale ? (
                    <Button danger type="primary" onClick={() => navigate(`/nft-detail/${nft.id}`)}>
                      End Sale
                    </Button>
                  ) : (
                    <>
                      <Button type="primary" onClick={() => handleSellClick(nft)}>Sell</Button>
                      <Button type="primary" onClick={() => handleAuctionClick(nft)}>Auction</Button>
                    </>
                  )}
                </div>
              ]}
            >
              <div onClick={() => navigate(`/nft-detail/${nft.id}`)}>
                <Meta
                  title={<Text strong>{nft.name}</Text>}
                  description={
                    nft.auction ? (
                      <Text type="secondary">Price: Auction</Text>
                    ) : (
                      <Text type="secondary">Price: {nft.price} APT</Text>
                    )
                  }
                />
                <p>ID: {nft.id}</p>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                  }}
                >
                  {nft.description}
                </div>
                <p style={{ fontSize: "12px" }}>
                  Owner: {nft.owner === account?.address && "You | "}
                  {truncateAddress(nft.owner)}
                </p>
                <p>QR Code:</p>
                <QRCodeCanvas
                  value={`https://fanfi-tickets.vercel.app/checkin?id=${nft.id}&owner=${nft.owner}`}
                  size={128}
                  includeMargin
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row> */}

      <div className="flex flex-wrap gap-6 justify-center items-center mt-5 w-full">
        {paginatedNFTs.map((nft) => (
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
    
      
              {/* Action Button */}
              <div className="w-full flex flex-row justify-evenly flex-grow-1 uppercase">
                {nft.auction ? (
                    <Button
                      type="primary"
                      className=""
                      disabled={nft.auction?.isExpired}
                      onClick={() => navigate(`/nft-detail/${nft.id}`)}
                    >
                      {nft.auction?.isExpired ? "Expired Auction" : "Ongoing Auction"}
                    </Button>
                  ) : nft.for_sale ? (
                    <Button danger type="primary" onClick={() => navigate(`/nft-detail/${nft.id}`)}>
                      End Sale
                    </Button>
                  ) : (
                    <>
                      <Button type="primary" onClick={() => handleSellClick(nft)}>Sell</Button>
                      <Button type="primary" onClick={() => handleAuctionClick(nft)}>Auction</Button>
                    </>
                  )}
              </div>
            </div>

            <div className="flex flex-col items-center mb-5">
              <p>QR Code:</p>
                  <QRCodeCanvas
                    value={`https://fanfi-tickets.vercel.app/checkin?id=${nft.id}&owner=${nft.owner}`}
                    size={128}
                    includeMargin
                  />
            </div>
      
            {/* Click overlay for navigation */}
            <div 
              className="absolute inset-0 cursor-pointer z-0"
              onClick={() => navigate(`/nft-detail/${nft.id}`)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalNFTs}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {selectedNft && (
        <ListForSaleModal
          isVisible={isModalVisible}
          onClose={handleModalClose}
          nftDetails={selectedNft}
          onRefresh={fetchUserNFTs}
        />
      )}
      {selectedNft && (
        <StartAuctionModal
          isVisible={isAuctionModalVisible}
          onClose={handleAuctionModalClose}
          nftDetails={selectedNft}
          onRefresh={fetchUserNFTs}
        />
      )}
    </div>
  );
};

export default MyNFTs;