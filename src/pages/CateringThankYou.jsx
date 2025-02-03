import React from "react";
import {
    Box,
    Button,
    Container,
    Typography,
    Stack,
    Avatar,
} from "@mui/material";
import BubbleTeaImage from "../assets/bubble_tea.jpg";

const CateringThankYou = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 8,
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    alt="Thank You"
                    src={BubbleTeaImage}
                    sx={{ width: 150, height: 150, mb: 3, boxShadow: 3 }}
                />
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                >
                    Thank You!
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ mb: 4 }}
                >
                    Your order has been received. We hope you enjoy the
                    experience!
                </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => (window.location.href = "/cateringservices")}
                >
                    Back to Catering
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => (window.location.href = "/")}
                >
                    Contact Us
                </Button>
            </Stack>
        </Container>
    );
};

export default CateringThankYou;
