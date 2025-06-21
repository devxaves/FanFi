import { Stack } from "@mui/system";
import React from "react";
import AuctionNFTs from "../auctionNFTs/AuctionNFTs";
import Collection from "../collection/Collection";
import Hero from "../hero/Hero";
import HowItWorks from "../howItWorks/HowItWorks";
import Influencers from "../influencers/Influencers";
import TendingNFts from "../tendingNFts/TendingNFts";
import WalletSupport from "../walletSupport/WalletSupport";

export default function Home() {
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
      <div id="live">
        <TendingNFts />
      </div>
      <div id="sports">
        <AuctionNFTs />
      </div>
      <div id="community">
        <Influencers />
      </div>
    </Stack>
  );
}
