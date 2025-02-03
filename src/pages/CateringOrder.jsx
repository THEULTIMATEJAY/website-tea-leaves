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
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CateringOrder() {
    const navigate = useNavigate();
    const [serviceType, setServiceType] = useState("");

    const handleServiceTypeChange = (event) => {
        const value = event.target.value;
        setServiceType(value);
        formik.setFieldValue("CateringServiceType", value);
    };

    const formik = useFormik({
        initialValues: {
            CateringOrderID: 1,
            ForeignUserID: 1, //Placeholder Value
            Name: "",
            MobileNumber: "",
            Email: "",
            CateringServiceType: "",
            Location: "",
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
            CateringServiceType: yup
                .string()
                .required("Catering Service Type is required"),
            Location: yup
                .string()
                .trim()
                .max(200, "Address must be at most 200 characters")
                .required("Address is required"),
        }),
        onSubmit: (data) => {
            data.Name = data.Name.trim();
            data.MobileNumber = data.MobileNumber.trim();
            data.Email = data.Email.trim();
            data.Location = data.Location.trim();
            http.post("/cateringorder", data).then((res) => {
                console.log(res.data);
                navigate("/cateringservices");
            });
        },
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Order Catering Service
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
                                width: "25%",
                                marginTop: "8px",
                                marginBottom: "4px",
                            }}
                        >
                            <InputLabel id="service-type-selection-label">
                                Package
                            </InputLabel>
                            <Select
                                labelId="service-type-selection-label"
                                id="service-type-selection"
                                label="Package"
                                value={serviceType}
                                name="CateringServiceType"
                                onChange={handleServiceTypeChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.CateringServiceType &&
                                    serviceType == ""
                                }
                            >
                                <MenuItem value="A">A</MenuItem>
                                <MenuItem value="B">B</MenuItem>
                                <MenuItem value="C">C</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            margin="dense"
                            autoComplete="off"
                            label="Location"
                            name="Location"
                            value={formik.values.Location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.Location &&
                                Boolean(formik.errors.Location)
                            }
                            helperText={
                                formik.touched.Location &&
                                formik.errors.Location
                            }
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

export default CateringOrder;
