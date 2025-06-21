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
      <Title level={2} style={{ marginBottom: 20 }}>Marketplace</Title>

      {/* Category Filters */}
      <Radio.Group
        value={category}
        onChange={(e) => {
          const selected = e.target.value;
          setCategory(selected);
          handleFetchNfts(selected === 'all' ? undefined : selected);
        }}
        buttonStyle="solid"
        style={{ marginBottom: 20 }}
      >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value={1}>Concert</Radio.Button>
        <Radio.Button value={2}>Sports</Radio.Button>
        <Radio.Button value={3}>Celebration</Radio.Button>
        <Radio.Button value={4}>Others</Radio.Button>
      </Radio.Group>

      {/* NFT Grid */}
      <Row gutter={[24, 24]} style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
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
      </Row>

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
