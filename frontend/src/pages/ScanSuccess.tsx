import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Typography, Button, Spin } from "antd";
import { fetchNFTDataUtil } from "../utils/fetchNFTData";
import { client } from "../utils/aptoClientUtil";
import { NFT } from "../types/nftType";

const { Title, Paragraph, Text } = Typography;

const ScanSuccess: React.FC = () => {
  const location = useLocation();
  const [nftData, setNftData] = useState<NFT | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const owner = params.get("owner");

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !owner) return;

      try {
        const result = await fetchNFTDataUtil(id, owner, client);
        setNftData(result);
      } catch (error) {
        console.error("Failed to fetch NFT data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, owner]);

  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!nftData) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <Title level={3} type="danger">❌ Failed to load ticket data.</Title>
        <Paragraph>Please ensure the QR code is valid.</Paragraph>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <Card style={{ maxWidth: 500, width: "100%", textAlign: "center" }}>
        <Title level={2} style={{ color: "green" }}>✅ Successfully Scanned a FanFi QR</Title>
        <Paragraph>
          <Text strong>Event:</Text> {nftData.name}
        </Paragraph>
        <Paragraph>
          <Text strong>Description:</Text> {nftData.description}
        </Paragraph>
        <Button
          type="primary"
          href={`https://fanfi-tickets.vercel.app/nft-detail/${id}`}
          style={{ marginTop: "1rem" }}
        >
          Show Ticket
        </Button>
      </Card>
    </div>
  );
};

export default ScanSuccess;
