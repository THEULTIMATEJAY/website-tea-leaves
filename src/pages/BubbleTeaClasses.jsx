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

function BubbleTeaClasses() {
    return (
        <Box>
            <br />
            <Box textAlign="center">
                <Typography variant="h4" component="h4">
                    Bubble Tea Classes
                </Typography>
                <Typography variant="h6" component="h6">
                    All classes include the option to BYOC - Bring Your Own Cup, for a discount!
                </Typography>
            </Box>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card
                        sx={{
                            backgroundColor: "lightgrey",
                        }}
                    >
                        <CardContent>
                            <Typography
                                gutterBottom
                                sx={{ color: "text.secondary", fontSize: 14 }}
                            >
                                Classic Flavors
                            </Typography>
                            <Typography variant="h5" component="div">
                                Classic Milk Tea with Tapioca Pearls
                            </Typography>
                            <Typography
                                sx={{ color: "text.secondary", mb: 1.5 }}
                            >
                                $10
                            </Typography>
                            <Typography variant="body2">
                                Learn how to make bubble tea
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box marginLeft="auto">
                                <Button size="medium" href="/classbooking">
                                    Book Now
                                </Button>
                            </Box>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card
                        sx={{
                            backgroundColor: "lightgrey",
                        }}
                    >
                        <CardContent>
                            <Typography
                                gutterBottom
                                sx={{ color: "text.secondary", fontSize: 14 }}
                            >
                                Fruity Flavors
                            </Typography>
                            <Typography variant="h5" component="div">
                                Lychee Black Tea or Lychee Green Tea
                            </Typography>
                            <Typography
                                sx={{ color: "text.secondary", mb: 1.5 }}
                            >
                                $10
                            </Typography>
                            <Typography variant="body2">
                                Learn how to make bubble tea
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box marginLeft="auto">
                                <Button size="medium" href="/classbooking">
                                    Book Now
                                </Button>
                            </Box>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card
                        sx={{
                            backgroundColor: "lightgrey",
                        }}
                    >
                        <CardContent>
                            <Typography
                                gutterBottom
                                sx={{ color: "text.secondary", fontSize: 14 }}
                            >
                                Taro and Yam Flavors
                            </Typography>
                            <Typography variant="h5" component="div">
                                Taro Milk Tea
                            </Typography>
                            <Typography
                                sx={{ color: "text.secondary", mb: 1.5 }}
                            >
                                $10
                            </Typography>
                            <Typography variant="body2">
                                Learn how to make bubble tea
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box marginLeft="auto">
                                <Button size="medium" href="/classbooking">
                                    Book Now
                                </Button>
                            </Box>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default BubbleTeaClasses;
