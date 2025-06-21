import React, { useEffect, useState } from "react";
import {
    Layout,
    Typography,
    Menu,
    Space,
    Button,
    Dropdown,
    message,
    Avatar,
} from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import {
    LogoutOutlined,
    MenuOutlined,
    UserOutlined,
    ShopOutlined,
    BarChartOutlined,
    AppstoreOutlined,
    ClockCircleOutlined,
    SendOutlined,
    SearchOutlined,
    WechatOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { client } from '../utils/aptoClientUtil';

const { Header } = Layout;
const { Text } = Typography;

 

interface NavBarProps {
    onMintNFTClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onMintNFTClick }) => {
    const { connected, account, network, disconnect } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState<string>("/");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        const fetchBalance = async () => {
            if (account) {
                try {
                    const resources: any[] = await client.getAccountResources(
                        account.address
                    );
                    const accountResource = resources.find(
                        (r) =>
                            r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
                    );
                    if (accountResource) {
                        const balanceValue = (accountResource.data as any).coin.value;
                        setBalance(balanceValue ? parseInt(balanceValue) / 100000000 : 0);
                    } else {
                        setBalance(0);
                    }
                } catch (error) {
                    console.error("Error fetching balance:", error);
                }
            }
        };

        if (connected) {
            fetchBalance();
        }
    }, [account, connected]);

    const handleLogout = async () => {
        try {
            await disconnect();
            setBalance(null);
            message.success("Disconnected from wallet");
        } catch (error) {
            console.error("Error disconnecting wallet:", error);
            message.error("Failed to disconnect from wallet");
        }
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuItems = [
        {
            key: "/",
            label: <Link to="/" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, display: 'flex', alignItems: 'center' }}> <ShopOutlined style={{ marginRight: 6}}/>Ticket-Place</Link>,
        },
        // {
        //     key: "/analytics",
        //     label: <Link to="/analytics" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, display: 'flex', alignItems: 'center' }}> <BarChartOutlined style={{ marginRight: 6}}/> Analytics</Link>,
        // },
        {
            key: "/my-tickets",
            label: <Link to="/my-tickets" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, display: 'flex', alignItems: 'center' }}> <AppstoreOutlined style={{ marginRight: 6}}/> My Collection</Link>,
        },
        // {
        //     key: "/auctions",
        //     label: <Link to="/auctions" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, display: 'flex', alignItems: 'center' }}> <ClockCircleOutlined style={{ marginRight: 6}}/> Auctions</Link>,
        // },
        // {
        //     key: "/transfer",
        //     label: <Link to="/transfer" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, display: 'flex', alignItems: 'center' }}> <SendOutlined style={{ marginRight: 6}}/> Transfer</Link>,
        // },
        {
            key: "/search",
            label: <Link to="/search" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, display: 'flex', alignItems: 'center' }}> <SearchOutlined style={{ marginRight: 6}}/> Search</Link>,
        },
        // {
        //     key: "/chat",
        //     label: <Link to="/chat" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, display: 'flex', alignItems: 'center' }}> <WechatOutlined style={{ marginRight: 6}}/> Chat</Link>,
        // },
        {
            key: "/mint-nft",
            label: <span onClick={onMintNFTClick} style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, display: 'flex', alignItems: 'center', cursor: 'pointer' }}> <PlusOutlined style={{ marginRight: 6}}/>Create Event</span>,
        },{
            key: "/admin/users",
            label: <Link to="/admin/users" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500, display: 'flex', alignItems: 'center' }}> <SearchOutlined style={{ marginRight: 6}}/>FanFi Score</Link>,
        },
    ];

    return (
        <Header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(15, 23, 42, 0.8)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                padding: "0 20px",
                boxShadow: "0 8px 32px rgba(139, 92, 246, 0.1)",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                height: "64px",
            }}
        >
            {/* Logo and Navigation */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src="/logo.png"
                    alt="FanFi Logo"
                    style={{
                        height: "30px",
                        marginRight: 20,
                        backgroundColor: "transparent",
                        filter: "brightness(1.2) drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))",
                    }}
                />
                {/* Desktop Menu */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    style={{ 
                        border: "none",
                        color: "rgba(255, 255, 255, 0.9)",
                        background: 'transparent'
                    }}
                    className="desktop-menu"
                >
                    {menuItems.map((item) => (
                        <Menu.Item
                            key={item.key}
                            style={{
                                color: "rgba(255, 255, 255, 0.9)",
                                fontWeight: "500",
                            }}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
                {/* Hamburger menu for mobile devices */}
               <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={toggleMenu}
                    style={{ 
                        color: "rgba(255, 255, 255, 0.9)", 
                        display: 'block', 
                        fontSize: "20px",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                        background: "rgba(139, 92, 246, 0.1)"
                    }}
                     className="mobile-menu-button"
                  />

                {/* Mobile menu dropdown */}
                {isMenuOpen && (
                    <div
                        className="mobile-menu-dropdown"
                        style={{
                            position: 'absolute',
                             top: '64px',
                            left: 0,
                            background: "rgba(15, 23, 42, 0.95)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2)',
                            zIndex: 100,
                            padding: '10px',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            borderTop: 'none',
                            width: '100%',
                            textAlign: "center",
                            maxHeight: "calc(100vh - 64px)",
                             overflowY: "auto",
                        }}
                    >
                        <Menu
                            theme="dark"
                            mode="vertical"
                            selectedKeys={[selectedKey]}
                            style={{ 
                                background: "transparent", 
                                border: "none",
                                color: "rgba(255, 255, 255, 0.9)"
                            }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {menuItems.map((item) => (
                                <Menu.Item
                                    key={item.key}
                                    style={{
                                        color: "rgba(255, 255, 255, 0.9)",
                                        fontWeight: "500",
                                    }}
                                >
                                    {item.label}
                                </Menu.Item>
                            ))}
                        </Menu>
                    </div>
                )}
            </div>
            {/* User Wallet Section */}
            <Space style={{ alignItems: "center" }}>
                {connected && account ? (
                    <Dropdown
                        overlay={
                            <Menu style={{
                                background: "rgba(15, 23, 42, 0.95)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(139, 92, 246, 0.3)",
                                borderRadius: "8px",
                                boxShadow: "0 8px 32px rgba(139, 92, 246, 0.2)"
                            }}>
                                <Menu.Item key="address" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                    <Text style={{ fontWeight: "bold", color: "#c084fc" }}>Address:</Text>
                                    <Text copyable style={{ color: "rgba(255, 255, 255, 0.8)" }}>{account.address}</Text>
                                </Menu.Item>
                                <Menu.Item key="network" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                    <Text style={{ fontWeight: "bold", color: "#c084fc" }}>Network:</Text>{" "}
                                    <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>{network ? network.name : "Unknown"}</Text>
                                </Menu.Item>
                                <Menu.Item key="balance" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                    <Text style={{ fontWeight: "bold", color: "#c084fc" }}>Balance:</Text>{" "}
                                    <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>{balance !== null ? `${balance} APT` : "Loading..."}</Text>
                                </Menu.Item>
                                <Menu.Divider style={{ borderColor: "rgba(139, 92, 246, 0.3)" }} />
                                <Menu.Item
                                    key="logout"
                                    icon={<LogoutOutlined style={{ color: "#f472b6" }} />}
                                    onClick={handleLogout}
                                    style={{ color: "rgba(255, 255, 255, 0.9)" }}
                                >
                                    <Text style={{ color: "rgba(255, 255, 255, 0.9)" }}>Log Out</Text>
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={["click"]}
                    >
                        <Button
                            type="text"
                            style={{
                                color: "rgba(255, 255, 255, 0.9)",
                                display: "flex",
                                alignItems: "center",
                                background: "rgba(139, 92, 246, 0.2)",
                                border: "1px solid rgba(139, 92, 246, 0.3)",
                                borderRadius: "8px",
                                backdropFilter: "blur(8px)",
                                WebkitBackdropFilter: "blur(8px)",
                            }}
                            icon={
                                <Avatar
                                    style={{
                                        background: "linear-gradient(135deg, #8b5cf6, #f472b6)",
                                        color: "white",
                                        marginRight: "5px",
                                        boxShadow: "0 4px 16px rgba(139, 92, 246, 0.3)"
                                    }}
                                    size="small"
                                    icon={<UserOutlined />}
                                />
                            }
                        >
                            <span
                                style={{
                                    fontWeight: 500,
                                    color: "rgba(255, 255, 255, 0.9)",
                                }}
                            >
                                Connected
                            </span>
                        </Button>
                    </Dropdown>
                ) : (
                    <div style={{
                        filter: "invert(1) hue-rotate(240deg) saturate(1.5)",
                    }}>
                        <WalletSelector />
                    </div>
                )}
            </Space>
            <style>{`
        
        .desktop-menu {
          display: none;
        }
        .mobile-menu-button {
            display: flex;
              font-size: 20px;
        }
              .ant-menu{
              background: transparent; !important
              }
          .ant-menu-item {
            padding: 0 16px !important;
          }
          
          .ant-menu-dark .ant-menu-item:hover {
            background: rgba(139, 92, 246, 0.2) !important;
            color: #c084fc !important;
          }
          
          .ant-menu-dark .ant-menu-item-selected {
            background: rgba(139, 92, 246, 0.3) !important;
            color: #c084fc !important;
          }
          
           .ant-menu-horizontal > .ant-menu-item::after {
            border-bottom: 2px solid #f472b6 !important;
          }
          
          .ant-menu-horizontal > .ant-menu-item-selected::after {
            border-bottom: 2px solid #f472b6 !important;
          }
          
           .mobile-menu-dropdown .ant-menu-item {
            padding: 10px 16px !important;
            text-align: left;
           }
         .mobile-menu-dropdown .ant-menu-item a {
            display: flex;
            align-items: center;
          }
           .mobile-menu-dropdown .ant-menu-item span svg {
               margin-right: 6px;
             }
             
          .mobile-menu-dropdown .ant-menu-dark .ant-menu-item:hover {
            background: rgba(139, 92, 246, 0.3) !important;
            color: #c084fc !important;
          }
          
          .mobile-menu-dropdown .ant-menu-dark .ant-menu-item-selected {
            background: rgba(139, 92, 246, 0.4) !important;
            color: #f472b6 !important;
          }

          @media (min-width: 768px) {
        .desktop-menu {
          display: flex !important;
        }
          .mobile-menu-button {
          display: none !important;
         }
        }
      `}</style>
        </Header>
    );
};

export default NavBar;