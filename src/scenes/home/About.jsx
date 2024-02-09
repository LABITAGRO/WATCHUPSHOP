import { Box, Typography, useMediaQuery, useTheme, Divider } from "@mui/material";
import { rakshit, shreesha } from "../../assets";
import { tokens } from "../../theme2";

const About = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const mobilePoint = useMediaQuery("(max-width: 749px)");

    return (
        <Box
            minHeight="calc(100vh - 80px)"
            px={{ xs: 2, sm: 5, md: 10 }}
            pt={10}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            gap={5}
        >
            {/* About Section */}
            <Box textAlign={mobilePoint ? 'center' : 'right'} width="100%" marginBottom={mobilePoint ? 3 : 0}>
                <Typography variant="h1" sx={{ color: 'orange' }}>About</Typography>
                <Divider sx={{ borderColor: 'orange' }} />
            </Box>

            {/* Content */}
            <Box
                width="100%"
                display="flex"
                flexDirection={mobilePoint ? "column" : "row"}
                justifyContent="center"
                alignItems="center"
                gap={5}
            >
                <Box
                    flexBasis={mobilePoint ? "100%" : "50%"}
                    display={mobilePoint ? "block" : "none"}
                >
                    <img
                        src={shreesha}
                        alt="Shreesha"
                        style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
                    />
                </Box>
                <Box
                    flexBasis="50%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems={mobilePoint ? "center" : "flex-start"}
                >
                    <img
                        src={rakshit}
                        alt="Rakshit"
                        style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
                    />
                    <Typography variant="h1">Watchupshop</Typography>
                    <Typography variant="h6" align="center">
    Discover and showcase old and vintage watches on our curated platform.
    Buy, sell, exchange, and even donate your watches to support meaningful causes.
    When you sell with us, share the occasion behind the watch, adding a personal touch.
    Trust our experts for meticulous watch services to ensure your cherished timepieces stand the test of time.
</Typography>

<Typography variant="h6" align="center">
    At WatchUpShop, we're not just a marketplace; we're a community celebrating timeless elegance.
    Join us in the world of vintage watches, where every tick tells a tale and every watch finds its perfect match.
    Explore the WatchUpShop experience today!
</Typography>

                    <Box mt={5} textAlign={mobilePoint ? "center" : "end"}>
                        <Typography variant="h6">- Watch your wrist...</Typography>
                    </Box>
                </Box>
                <Box
                    flexBasis={mobilePoint ? "100%" : "50%"}
                    display={mobilePoint ? "none" : "block"}
                >
                    <img
                        src={shreesha}
                        alt="Shreesha"
                        style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default About;
