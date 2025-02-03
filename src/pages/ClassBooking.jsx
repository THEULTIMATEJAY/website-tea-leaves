import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ClassBooking() {
    const navigate = useNavigate();
    const [classType, setClassType] = useState("");
    const [session, setSession] = useState("");
    const [byoc, setByoc] = useState(false);

    const handleClassTypeChange = (event) => {
        const value = event.target.value;
        setClassType(value);
        formik.setFieldValue("ClassType", value);
    };

    const handleSessionChange = (event) => {
        const value = event.target.value;
        setSession(value);
        formik.setFieldValue("Session", value);
    };

    const handleBYOCChange = (event) => {
        const isChecked = event.target.checked;
        setByoc(isChecked);
        formik.setFieldValue("BYOC", isChecked);
    };

    const formik = useFormik({
        initialValues: {
            ClassBookingID: 1,
            ForeignUserID: 1, //Placeholder Value
            Name: "",
            MobileNumber: "",
            Email: "",
            ClassType: "",
            Session: "",
            BYOC: false,
        },
        validationSchema: yup.object({
            Name: yup
                .string()
                .trim()
                .min(3, "Name must be at least 3 characters")
                .max(100, "Name must be at most 100 characters")
                .required("Name is required"),
            MobileNumber: yup
                .string()
                .trim()
                .matches(/^\+?[1-9]\d{1,14}$/, "Invalid Mobile Number")
                .required("Mobile Number is required"),
            Email: yup
                .string()
                .trim()
                .email("Enter a valid email")
                .max(50, "Email must be at most 50 characters")
                .required("Email is required"),
            ClassType: yup.string().required("Please choose a class"),
            Session: yup.string().required("Please choose a session"),
            BYOC: yup.boolean(),
        }),
        onSubmit: (data) => {
            data.Name = data.Name.trim();
            data.MobileNumber = data.MobileNumber.trim();
            data.Email = data.Email.trim();
            http.post("/classbooking", data).then((res) => {
                console.log(res.data);
                navigate("/bubbleteathankyou");
            });
        },
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Bubble Tea Class Booking
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={8}>
                        <TextField
                            fullWidth
                            margin="dense"
                            autoComplete="off"
                            label="Name"
                            name="Name"
                            value={formik.values.Name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.Name &&
                                Boolean(formik.errors.Name)
                            }
                            helperText={
                                formik.touched.Name && formik.errors.Name
                            }
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            autoComplete="off"
                            label="Mobile Number"
                            name="MobileNumber"
                            value={formik.values.MobileNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.MobileNumber &&
                                Boolean(formik.errors.MobileNumber)
                            }
                            helperText={
                                formik.touched.MobileNumber &&
                                formik.errors.MobileNumber
                            }
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            autoComplete="off"
                            label="Email"
                            name="Email"
                            value={formik.values.Email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.Email &&
                                Boolean(formik.errors.Email)
                            }
                            helperText={
                                formik.touched.Email && formik.errors.Email
                            }
                        />
                        <FormControl
                            sx={{
                                marginTop: "8px",
                                marginBottom: "4px",
                            }}
                            fullWidth
                        >
                            <InputLabel id="class-type-selection-label">
                                Class
                            </InputLabel>
                            <Select
                                labelId="class-type-selection-label"
                                id="class-type-selection"
                                label="Class"
                                value={classType}
                                name="ClassType"
                                onChange={handleClassTypeChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.ClassType && classType == ""
                                }
                            >
                                <MenuItem value="C">
                                    Classic Milk Tea with Tapioca Pearls
                                </MenuItem>
                                <MenuItem value="F">
                                    Lychee Black Tea or Lychee Green Tea
                                </MenuItem>
                                <MenuItem value="T">Taro Milk Tea</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            sx={{
                                marginTop: "8px",
                                marginBottom: "4px",
                            }}
                            fullWidth
                        >
                            <InputLabel id="session-type-selection-label">
                                Session
                            </InputLabel>
                            <Select
                                labelId="session-type-selection-label"
                                id="session-type-selection"
                                label="Session"
                                value={session}
                                name="Session"
                                onChange={handleSessionChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.Session && session == ""}
                            >
                                <MenuItem value="A1">
                                    11am - 12pm, 18 Jan
                                </MenuItem>
                                <MenuItem value="A2">
                                    1pm - 2pm, 18 Jan
                                </MenuItem>
                                <MenuItem value="A3">
                                    3pm - 4pm, 18 Jan
                                </MenuItem>
                                <MenuItem value="B1">
                                    11am - 12pm, 19 Jan
                                </MenuItem>
                                <MenuItem value="B2">
                                    1pm - 2pm, 19 Jan
                                </MenuItem>
                                <MenuItem value="B3">
                                    3pm - 4pm, 19 Jan{" "}
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={byoc}
                                    onChange={handleBYOCChange}
                                />
                            }
                            label="Bring Your Own Cup - $1 discount"
                            labelPlacement="start"
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Order
                    </Button>
                </Box>
            </Box>

            <ToastContainer />
        </Box>
    );
}

export default ClassBooking;
