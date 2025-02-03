import React from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);

function CateringServices() {
    return (
        <Box>
            <br />
            <Box textAlign="center">
                <Typography variant="h4" component="h4">
                    Catering Services
                </Typography>
            </Box>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography
                                gutterBottom
                                sx={{ color: "text.secondary", fontSize: 14 }}
                            >
                                Package A
                            </Typography>
                            <Typography variant="h5" component="div">
                                Standard
                            </Typography>
                            <Typography
                                sx={{ color: "text.secondary", mb: 1.5 }}
                            >
                                $300++
                            </Typography>
                            <Typography variant="body2">
                                Features Include:
                                <br />
                                {bull} Basic Feature
                                <br />
                                {bull} Extra 1
                                <br />
                                {bull} Extra 2
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box marginLeft="auto">
                                <Button size="medium" href="/cateringorder">Order Now</Button>
                            </Box>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography
                                gutterBottom
                                sx={{ color: "text.secondary", fontSize: 14 }}
                            >
                                Package B
                            </Typography>
                            <Typography variant="h5" component="div">
                                Premium
                            </Typography>
                            <Typography
                                sx={{ color: "text.secondary", mb: 1.5 }}
                            >
                                $500++
                            </Typography>
                            <Typography variant="body2">
                                Features Include:
                                <br />
                                {bull} Everything from before
                                <br />
                                {bull} Extra 1
                                <br />
                                {bull} Extra 2
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Box marginLeft="auto">
                                <Button size="medium" href="/cateringorder">Order Now</Button>
                            </Box>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography
                                gutterBottom
                                sx={{ color: "text.secondary", fontSize: 14 }}
                            >
                                Package C
                            </Typography>
                            <Typography variant="h5" component="div">
                                Deluxe
                            </Typography>
                            <Typography
                                sx={{ color: "text.secondary", mb: 1.5 }}
                            >
                                $700++
                            </Typography>
                            <Typography variant="body2">
                                Features Include:
                                <br />
                                {bull} Everything from before
                                <br />
                                {bull} Extra 1
                                <br />
                                {bull} Extra 2
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Box marginLeft="auto">
                                <Button size="medium" href="/cateringorder">Order Now</Button>
                            </Box>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CateringServices;
