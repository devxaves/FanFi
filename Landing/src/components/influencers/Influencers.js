import { Avatar } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { CCard, CTypography, OutlinedBtn } from "../../utility";
// Example top fans/ambassadors
const topFans = [
    { id: 1, name: "Amit Sharma", userName: "amitsharma", avatar: require("../../assets/images/InfluencersAvatar1.png"), fanScore: 98, badge: 'Gold' },
    { id: 2, name: "Priya Singh", userName: "priyasingh", avatar: require("../../assets/images/InfluencersAvatar2.png"), fanScore: 95, badge: 'Silver' },
    { id: 3, name: "Rahul Verma", userName: "rahulverma", avatar: require("../../assets/images/InfluencersAvatar3.png"), fanScore: 93, badge: 'Bronze' },
    { id: 4, name: "Sneha Patel", userName: "snehapatel", avatar: require("../../assets/images/InfluencersAvatar4.png"), fanScore: 90, badge: 'Silver' },
];
export default function Influencers() {
    const TopSection = () => (
        <Stack spacing={4}>
            <CTypography fontSize={18} fontWeight={100} fontFamily="Poppins" textTransform="capitalize">
                Top Fans & Ambassadors
            </CTypography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" my={2}>
                <CTypography fontWeight={600} fontFamily="Oxanium" textTransform="capitalize" fontSize={{ md: 70, sm: 30, xs: 25 }}>
                    Our Community Stars
                </CTypography>
                <OutlinedBtn btnTitle={'view all'} btnHeight="35px" />
            </Stack>
        </Stack>
    );
    const CardSection = () => (
        <Stack direction="row" gap={4} flexWrap="wrap" alignItems="center" justifyContent="center" rowGap={4}>
            {topFans.map((fan) => (
                <CCard key={fan.id} background={"linear-gradient(147.75deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);"} backdropFilter={"blur(10px)"} borderRadius={'15px'} p={1} noHover borderWidth={'0px'}>
                    <Stack alignItems="center" spacing={2}>
                        <Avatar src={fan.avatar} alt={fan.name} sx={{ width: 80, height: 80 }} />
                        <CTypography fontSize={18} fontWeight={600} fontFamily="Oxanium" textTransform="capitalize">
                            {fan.name}
                        </CTypography>
                        <CTypography fontSize={14} fontWeight={400} fontFamily="Poppins" color="#CBCBCB">
                            @{fan.userName}
                        </CTypography>
                        <CTypography fontSize={16} fontWeight={500} color="#AD1AAF">
                            Fan Score: {fan.fanScore}
                        </CTypography>
                        <CTypography fontSize={14} fontWeight={400} color="#FFD700">
                            {fan.badge} Badge
                        </CTypography>
                        <OutlinedBtn btnTitle={'View Profile'} btnHeight="35px" />
                    </Stack>
                </CCard>
            ))}
        </Stack>
    );
    return (
        <Stack px={{ md: 10, sm: 5, xs: 2 }} py={{ sm: 10, xs: 0 }} spacing={8}>
            <TopSection />
            <CardSection />
        </Stack>
    );
}
