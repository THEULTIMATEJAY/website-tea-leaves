import "./App.css";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import MyTheme from "./themes/MyTheme";
import CateringServices from "./pages/CateringServices";
import CateringOrder from "./pages/CateringOrder";
import BubbleTeaClasses from "./pages/BubbleTeaClasses";
import ClassBooking from "./pages/ClassBooking";
import BubbleTeaThankYou from "./pages/BubbleTeaThankYou";
import CateringThankYou from "./pages/CateringThankYou";

function App() {
    return (
        <>
            <Router>
                <ThemeProvider theme={MyTheme}>
                    <AppBar position="static" className="AppBar">
                        <Container>
                            <Toolbar disableGutters={true}>
                                <Link to="/">
                                    <Typography variant="h6" component="div">
                                        EDP Project
                                    </Typography>
                                </Link>
                                <Link to="/cateringservices">
                                    <Typography>Catering Services</Typography>
                                </Link>
                                <Link to="/bubbleteaclasses">
                                    <Typography>Bubble Tea Classes</Typography>
                                </Link>
                            </Toolbar>
                        </Container>
                    </AppBar>

                    <Container>
                        <Routes>
                            <Route
                                path={"/cateringservices"}
                                element={<CateringServices />}
                            />
                            <Route
                                path={"/cateringorder"}
                                element={<CateringOrder />}
                            />
                            <Route
                                path={"/bubbleteaclasses"}
                                element={<BubbleTeaClasses />}
                            />
                            <Route
                                path={"/classbooking"}
                                element={<ClassBooking />}
                            />
                            <Route
                                path={"/bubbleteathankyou"}
                                element={<BubbleTeaThankYou />}
                            />
                            <Route
                                path={"/cateringthankyou"}
                                element={<CateringThankYou />}
                            />
                        </Routes>
                    </Container>
                </ThemeProvider>
            </Router>
        </>
    );
}

export default App;
