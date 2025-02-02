import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid2 as Grid, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);

    // Predefined toppings and temperature options for staff
    const predefinedToppings = ["Pearls", "Pudding", "Grass Jelly", "Aloe Vera", "Red Beans", "Coconut Jelly"];
    const temperatureOptions = ["Hot", "Cold"];
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [selectedTemperatures, setSelectedTemperatures] = useState([]);

    const handleToppingsChange = (event) => {
        const { target: { value } } = event;
        setSelectedToppings(typeof value === 'string' ? value.split(',') : value);
    };

    const handleTemperaturesChange = (event) => {
        const { target: { value } } = event;
        setSelectedTemperatures(typeof value === 'string' ? value.split(',') : value);
    };

    const formik = useFormik({
        initialValues: {
            Prod_name: "",
            Price: "",
            Stock: "",
            Description: "",
        },
        validationSchema: yup.object({
            Prod_name: yup.string().trim()
                .min(3, 'Product name must be at least 3 characters')
                .max(100, 'Product name must be at most 100 characters')
                .required('Product name is required'),
            Price: yup.number()
                .min(0, 'Price must be at least 0')
                .required('Price is required'),
            Stock: yup.number()
                .min(0, 'Stock must be at least 0')
                .required('Stock is required'),
            Description: yup.string().trim()
                .max(500, 'Description must be at most 500 characters'),
        }),
        onSubmit: (data) => {
            data.Price = parseFloat(data.Price);
            console.log("Request Data: ", data);
            console.log("Selected Temperatures: ", selectedTemperatures);
            console.log("Selected Toppings: ", selectedToppings);
            data.Toppings = selectedToppings; // Save selected toppings as a comma-separated string
            data.Temperature = selectedTemperatures; // Save selected temperatures as a comma-separated string

            if (imageFile) {
                data.imageFile = imageFile;
            }else {
                data.ImageFile = null; // Ensure null is sent if no image is uploaded
            }

            http.post("/product", data)
                .then((res) => {
                    toast.success('Product added successfully!');
                    navigate("/products");
                    
                })
                .catch((err) => {
                    toast.error('Error adding product!');
                    console.error(err);
                });
        },
    });

    const onFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                toast.error('Maximum file size is 1MB');
                return;
            }

            let formData = new FormData();
            formData.append('file', file);
            http.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    setImageFile(res.data.filename);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };
      

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Product (Staff)
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Product Name"
                            name="Prod_name"
                            value={formik.values.Prod_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Prod_name && Boolean(formik.errors.Prod_name)}
                            helperText={formik.touched.Prod_name && formik.errors.Prod_name}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Price"
                            name="Price"
                            type="number"
                            value={formik.values.Price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Price && Boolean(formik.errors.Price)}
                            helperText={formik.touched.Price && formik.errors.Price}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Temperature</InputLabel>
                            <Select
                                multiple
                                value={selectedTemperatures}
                                onChange={handleTemperaturesChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {temperatureOptions.map((Temperature) => (
                                    <MenuItem key={Temperature} value={Temperature}>
                                        <Checkbox checked={selectedTemperatures.indexOf(Temperature) > -1} />
                                        <ListItemText primary={Temperature} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Toppings</InputLabel>
                            <Select
                                multiple
                                value={selectedToppings}
                                onChange={handleToppingsChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {predefinedToppings.map((Toppings) => (
                                    <MenuItem key={Toppings} value={Toppings}>
                                        <Checkbox checked={selectedToppings.indexOf(Toppings) > -1} />
                                        <ListItemText primary={Toppings} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            multiline minRows={2}
                            label="Description"
                            name="Description"
                            value={formik.values.Description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Description && Boolean(formik.errors.Description)}
                            helperText={formik.touched.Description && formik.errors.Description}
                        />
                        <TextField
                            fullWidth margin="dense" autoComplete="off"
                            label="Stock"
                            name="Stock"
                            type="number"
                            value={formik.values.Stock}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Stock && Boolean(formik.errors.Stock)}
                            helperText={formik.touched.Stock && formik.errors.Stock}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Button variant="contained" component="label">
                                Upload Image
                                <input hidden accept="image/*" multiple type="file" onChange={onFileChange} />
                            </Button>
                            {imageFile && (
                                <Box className="aspect-ratio-container" sx={{ mt: 2 }}>
                                    <img alt="product" src={`${import.meta.env.VITE_FILE_BASE_URL}${imageFile}`} />
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add Product
                    </Button>
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default AddProduct;
