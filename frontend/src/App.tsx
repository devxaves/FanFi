// src/App.tsx

import React, { useState } from "react";
import "./App.css";
import { Layout, Modal, Form, Input, Select, Button, message } from "antd";
import NavBar from "./components/NavBar";
import MarketView from "./pages/MarketView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNFTs from "./pages/MyNFTs";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MARKET_PLACE_ADDRESS, MARKET_PLACE_NAME } from "./Constants";
import AuctionPage from "./pages/AuctionPage";
import Transfer from "./pages/Transfer";
import NFTDetail from "./pages/NFTDetail";
import Analytics from "./pages/Analytics";
import ChatPage from "./pages/ChatPage";
import SearchNFT from "./pages/SearchNFT";
import { client } from "./utils/aptoClientUtil";
import ScanSuccess from "./pages/ScanSuccess";

function App() {
  const { signAndSubmitTransaction } = useWallet();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to open the Mint NFT modal
  const handleMintNFTClick = () => setIsModalVisible(true);

  const handleMintNFT = async (values: { name: string; description: string; uri: string; rarity: number }) => {
    try {
      const nameVector = Array.from(new TextEncoder().encode(values.name));
      const descriptionVector = Array.from(new TextEncoder().encode(values.description));
      const uriVector = Array.from(new TextEncoder().encode(values.uri));
      console.log("rarity::", values.rarity)
      const entryFunctionPayload = {
        type: "entry_function_payload",
        function: `${MARKET_PLACE_ADDRESS}::${MARKET_PLACE_NAME}::mint_nft`,
        type_arguments: [],
        arguments: [nameVector, descriptionVector, uriVector, values.rarity],
      };

      const txnResponse = await (window as any).aptos.signAndSubmitTransaction(entryFunctionPayload);
      console.log("Transaction Response:", txnResponse);
      await client.waitForTransaction(txnResponse.hash);

      message.success("NFT minted successfully!");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error minting NFT:", error);
      message.error("Failed to mint NFT.");
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: 'transparent' }}>
      <Router>
        <Layout className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
          {/* Navbar wrapper */}
          <NavBar onMintNFTClick={handleMintNFTClick} />

          {/* Main content area */}
          <div className="flex-1" style={{ backgroundColor: 'transparent' }}>
            <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<MarketView />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/my-nfts" element={<MyNFTs />} />
                <Route path="/auctions" element={<AuctionPage />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/checkin" element={<ScanSuccess />} />
                <Route path="/nft-detail/:tokenId" element={<NFTDetail />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/search" element={<SearchNFT />} />
              </Routes>
            </div>
          </div>

          <div className="mx-auto mt-12 mb-5">
<p className="text-lg text-center mb-3" style={{fontFamily:'Oxanium'}} >Powered By</p>
<img
                    src="/Aptos_Primary_WHT.png"
                    alt="Aptos Logo"
                    style={{
                        height: "30px",
                        backgroundColor: "transparent",
                        filter: "brightness(1.2) drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))",
                    }}
                />
          </div>

          {/* Custom styled modal */}
          <Modal
            title={
              <div className="text-white text-xl font-semibold flex items-center gap-2">
                {/* <span style={{ color: '#C778DD' }}>✨</span> */}
                Mint New NFT
              </div>
            }
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            className="mint-nft-modal"
            styles={{
              mask: { backgroundColor: 'rgba(20, 12, 31, 0.9)' },
              content: { 
                backgroundColor: '#240a4a',
                border: '1px solid rgba(199, 120, 221, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)'
              }
            }}
          >
            <div className="p-6">
              <Form 
                layout="vertical" 
                onFinish={handleMintNFT}
                className="space-y-6"
              >
                <Form.Item 
                  label={<span className="text-white font-medium text-sm">NFT Name</span>} 
                  name="name" 
                  rules={[{ required: true, message: "Please enter a name!" }]}
                >
                  <Input 
                    placeholder="Enter your NFT name..."
                    className="rounded-lg px-4 py-3 transition-all duration-200"
                    style={{
                      backgroundColor: '#140C1F',
                      borderColor: 'rgba(199, 120, 221, 0.3)',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </Form.Item>

                <Form.Item 
                  label={<span className="text-white font-medium text-sm">Description</span>} 
                  name="description" 
                  rules={[{ required: true, message: "Please enter a description!" }]}
                >
                  <Input.TextArea 
                    placeholder="Describe your NFT..."
                    rows={3}
                    className="rounded-lg px-4 py-3 transition-all duration-200"
                    style={{
                      backgroundColor: '#140C1F',
                      borderColor: 'rgba(199, 120, 221, 0.3)',
                      color: 'white',
                      resize: 'none',
                      fontSize: '14px'
                    }}
                  />
                </Form.Item>

                <Form.Item 
                  label={<span className="text-white font-medium text-sm">Image URI</span>} 
                  name="uri" 
                  rules={[{ required: true, message: "Please enter a URI!" }]}
                >
                  <Input 
                    placeholder="https://example.com/image.jpg"
                    className="rounded-lg px-4 py-3 transition-all duration-200"
                    style={{
                      backgroundColor: '#140C1F',
                      borderColor: 'rgba(199, 120, 221, 0.3)',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </Form.Item>

                <Form.Item 
                  label={<span className="text-white font-medium text-sm">Category</span>} 
                  name="rarity" 
                  rules={[{ required: true, message: "Please select a category!" }]}
                >
                  <Select
                    placeholder="Select a category..."
                    className="mint-select"
                    style={{ height: '48px' }}
                  >
                    <Select.Option value={1}>🎵 Concert</Select.Option>
                    <Select.Option value={2}>⚽ Sports</Select.Option>
                    <Select.Option value={3}>🎉 Celebration</Select.Option>
                    <Select.Option value={4}>🌟 Others</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item className="mb-0 pt-4">
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setIsModalVisible(false)}
                      className="flex-1 h-12 rounded-lg font-medium transition-all duration-200"
                      style={{
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(199, 120, 221, 0.3)',
                        color: 'white'
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      className="flex-1 h-12 rounded-lg font-semibold transition-all duration-200"
                      style={{
                        backgroundColor: '#C778DD',
                        borderColor: '#C778DD',
                        color: '#140C1F'
                      }}
                    >
                      Mint NFT
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </Layout>
      </Router>

      {/* Global styles for consistent theming */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Global text styling */
          * {
            color: white !important;
          }
          
          /* Layout styling */
          .ant-layout {
            background: #140C1F !important;
          }
          
          .ant-layout-content {
            background: #140C1F !important;
          }
          
          /* Modal styling */
          .ant-modal .ant-modal-content {
            background: #240a4a !important;
            border: 1px solid rgba(199, 120, 221, 0.2) !important;
          }
          
          .ant-modal .ant-modal-header {
            background: transparent !important;
            border-bottom: 1px solid rgba(199, 120, 221, 0.1) !important;
          }
          
          .ant-modal .ant-modal-title {
            color: white !important;
          }
          
          .ant-modal .ant-modal-close {
            color: white !important;
          }
          
          .ant-modal .ant-modal-close:hover {
            color: #C778DD !important;
          }
          
          /* Form styling */
          .ant-form-item-label > label {
            color: white !important;
            font-weight: 500 !important;
          }
          
          .ant-form-item-explain-error {
            color: #ff6b6b !important;
          }
          
          /* Input styling */
          .ant-input, .ant-input-affix-wrapper {
            background: #140C1F !important;
            border-color: rgba(199, 120, 221, 0.3) !important;
            color: white !important;
          }
          
          .ant-input::placeholder {
            color: rgba(255, 255, 255, 0.5) !important;
          }
          
          .ant-input:hover, .ant-input-affix-wrapper:hover {
            border-color: rgba(199, 120, 221, 0.5) !important;
          }
          
          .ant-input:focus, .ant-input-affix-wrapper:focus-within {
            border-color: #C778DD !important;
            box-shadow: 0 0 0 2px rgba(199, 120, 221, 0.2) !important;
          }
          
          /* Select styling */
          .ant-select .ant-select-selector {
            background: #140C1F !important;
            border-color: rgba(199, 120, 221, 0.3) !important;
            color: white !important;
          }
          
          .ant-select-selection-placeholder {
            color: rgba(255, 255, 255, 0.5) !important;
          }
          
          .ant-select-arrow {
            color: #C778DD !important;
          }
          
          .ant-select:hover .ant-select-selector {
            border-color: rgba(199, 120, 221, 0.5) !important;
          }
          
          .ant-select-focused .ant-select-selector {
            border-color: #C778DD !important;
            box-shadow: 0 0 0 2px rgba(199, 120, 221, 0.2) !important;
          }
          
          .ant-select-dropdown {
            background: #240a4a !important;
            border: 1px solid rgba(199, 120, 221, 0.2) !important;
          }
          
          .ant-select-item {
            color: white !important;
          }
          
          .ant-select-item:hover {
            background: rgba(199, 120, 221, 0.1) !important;
          }
          
          .ant-select-item-option-selected {
            background: rgba(199, 120, 221, 0.2) !important;
            color: white !important;
          }
          
          /* Button styling */
          .ant-btn {
            color: white !important;
            border-radius: 8px !important;
            font-weight: 500 !important;
          }
          
          .ant-btn-primary {
            background: #C778DD !important;
            border-color: #C778DD !important;
            color: #140C1F !important;
          }
          
          .ant-btn-primary:hover {
            background: rgba(199, 120, 221, 0.8) !important;
            border-color: rgba(199, 120, 221, 0.8) !important;
            color: #140C1F !important;
          }
          
          /* Message styling */
          .ant-message {
            z-index: 9999;
          }
          
          .ant-message-notice-content {
            background: #240a4a !important;
            border: 1px solid rgba(199, 120, 221, 0.2) !important;
            color: white !important;
          }
          
          .ant-message-success .anticon {
            color: #C778DD !important;
          }
          
          .ant-message-error .anticon {
            color: #ff6b6b !important;
          }
          
          /* Card styling */
          .ant-card {
            background: #240a4a !important;
            border: 1px solid rgba(199, 120, 221, 0.2) !important;
            border-radius: 12px !important;
          }
          
          .ant-card-head {
            background: transparent !important;
            border-bottom: 1px solid rgba(199, 120, 221, 0.1) !important;
          }
          
          .ant-card-head-title {
            color: white !important;
          }
          
          .ant-card-body {
            color: white !important;
          }
          
          /* Table styling */
          .ant-table {
            background: #240a4a !important;
            color: white !important;
          }
          
          .ant-table-thead > tr > th {
            background: #140C1F !important;
            color: white !important;
            border-bottom: 1px solid rgba(199, 120, 221, 0.2) !important;
          }
          
          .ant-table-tbody > tr > td {
            background: #240a4a !important;
            color: white !important;
            border-bottom: 1px solid rgba(199, 120, 221, 0.1) !important;
          }
          
          .ant-table-tbody > tr:hover > td {
            background: rgba(199, 120, 221, 0.1) !important;
          }
          
          /* Menu styling */
          .ant-menu {
            background: #240a4a !important;
            color: white !important;
          }
          
          .ant-menu-item {
            color: white !important;
          }
          
          .ant-menu-item:hover {
            color: #C778DD !important;
            background: rgba(199, 120, 221, 0.1) !important;
          }
          
          .ant-menu-item-selected {
            background: rgba(199, 120, 221, 0.2) !important;
            color: #C778DD !important;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #140C1F;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #C778DD;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(199, 120, 221, 0.8);
          }
          
          /* Typography */
          h1, h2, h3, h4, h5, h6 {
            color: white !important;
          }
          
          p, span, div {
            color: white !important;
          }
          
          .ant-typography {
            color: white !important;
          }
          
          /* Links */
          a {
            color: #C778DD !important;
          }
          
          a:hover {
            color: rgba(199, 120, 221, 0.8) !important;
          }
          
          /* Badges and Tags */
          .ant-badge {
            color: white !important;
          }
          
          .ant-tag {
            background: rgba(199, 120, 221, 0.2) !important;
            border: 1px solid rgba(199, 120, 221, 0.3) !important;
            color: white !important;
          }
          
          /* Pagination */
          .ant-pagination-item {
            background: #240a4a !important;
            border: 1px solid rgba(199, 120, 221, 0.3) !important;
          }
          
          .ant-pagination-item a {
            color: white !important;
          }
          
          .ant-pagination-item-active {
            background: #C778DD !important;
            border-color: #C778DD !important;
          }
          
          .ant-pagination-item-active a {
            color: #140C1F !important;
          }
          
          /* Drawer */
          .ant-drawer .ant-drawer-content {
            background: #240a4a !important;
          }
          
          .ant-drawer .ant-drawer-header {
            background: #140C1F !important;
            border-bottom: 1px solid rgba(199, 120, 221, 0.2) !important;
          }
          
          .ant-drawer-title {
            color: white !important;
          }
          
          .ant-drawer-close {
            color: white !important;
          }
          
          .ant-drawer-close:hover {
            color: #C778DD !important;
          }
        `
      }} />
    </div>
  );
}

export default App;