import { Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { CTypography } from "../../utility/";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./howItWorksTimeline-attractive.css";
import {
  ConnectIcon,
  AIIcon,
  ApplyIcon,
  NFTIcon,
  QRIcon,
  MetaverseIcon,
} from "../../assets/svg/HowItWorksIcons";

// Timeline steps with custom SVG icons
const steps = [
  {
    id: 1,
    icon: <ConnectIcon />,
    name: "Connect Your Accounts",
    desc: "Link your Civic ID, Spotify, BookMyShow, and more.",
  },
  {
    id: 2,
    icon: <AIIcon />,
    name: "Get Your Fan Score",
    desc: "AI analyzes your engagement and interests.",
  },
  {
    id: 3,
    icon: <ApplyIcon />,
    name: "Apply for Events",
    desc: "Priority access based on your Fan Score.",
  },
  {
    id: 4,
    icon: <NFTIcon />,
    name: "NFT Ticket Minting",
    desc: "Tickets minted as NFTs on Aptos blockchain.",
  },
  {
    id: 5,
    icon: <QRIcon />,
    name: "On-Chain Check-In",
    desc: "Scan QR at venue for secure entry.",
  },
  {
    id: 6,
    icon: <MetaverseIcon />,
    name: "Metaverse Access",
    desc: "Overflow users join in VR metaverse.",
  },
];
// Timeline Item component with animations
const TimelineItem = ({ step, index, inViewRef }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Combine refs
  const setRefs = React.useCallback(
    (node) => {
      ref(node);
      if (inViewRef) {
        inViewRef(node);
      }
    },
    [inViewRef, ref]
  );

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.2,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      ref={setRefs}
      className="timeline-item"
      initial="hidden"
      animate={controls}
      variants={fadeIn}
    >
      <motion.div className="timeline-icon" variants={iconVariants}>
        {step.icon}
      </motion.div>
      <div className="connector"></div>
      <div className="step-number">{step.id}</div>
      <div className="timeline-content">
        <h3 className="timeline-title">{step.name}</h3>
        <p className="timeline-description">{step.desc}</p>
      </div>
      {index < 5 && <div className="step-arrow">→</div>}
    </motion.div>
  );
};

export default function HowItWorks() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };
  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Container maxWidth="xl">
      <Stack gap={6} py={{ sm: 12, xs: 6 }}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={headerVariants}
        >
          <CTypography
            fontWeight={600}
            textAlign="center"
            fontFamily="Oxanium"
            fontSize={{ lg: 64, md: 50, xs: 38 }}
            sx={{
              background: "linear-gradient(90deg, #ffffff 0%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            How FANFi Works
          </CTypography>
        </motion.div>

        <motion.div
          className="timeline-container"
          initial="hidden"
          animate={controls}
          variants={lineVariants}
        >
          <div className="timeline">
            <div className="timeline-items-container">
              {steps.map((step, idx) => (
                <TimelineItem key={step.id} step={step} index={idx} />
              ))}
            </div>
          </div>
        </motion.div>
      </Stack>
    </Container>
  );
}
