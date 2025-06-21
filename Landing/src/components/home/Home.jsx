import { Stack } from "@mui/system";
import React from "react";
import AuctionNFTs from "../auctionNFTs/AuctionNFTs";
import Collection from "../collection/Collection";
import Hero from "../hero/Hero";
import HowItWorks from "../howItWorks/HowItWorks";
import Influencers from "../influencers/Influencers";
import TendingNFts from "../tendingNFts/TendingNFts";
import WalletSupport from "../walletSupport/WalletSupport";
import { useUser } from "@civic/auth/react";

export default function Home() {
  const user = useUser();
  const isLoggedIn = Boolean(user?.id);

  return (
    <Stack gap={10}>
      <Hero />
      <div id="partners">
            <WalletSupport />
          </div>
          <div id="workflow">
            <HowItWorks />
          </div>
          <div id="featured">
            <Collection />
          </div>

      {/* ✅ Only show rest of the home sections when logged in */}
      {isLoggedIn && (
        <>
          
          <div id="live">
            <TendingNFts />
          </div>
          <div id="sports">
            <AuctionNFTs />
          </div>
          <div id="community">
            <Influencers />
          </div>
        </>
      )}
    </Stack>
  );
}
