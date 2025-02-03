import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid2 as Grid, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProduct() {
    const { id } = useParams();
    console.log("Product ID:", id);
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const predefinedToppings = ["Pearls", "Pudding", "Grass Jelly", "Aloe Vera", "Red Beans", "Coconut Jelly"];
    const temperatureOptions = ["Hot", "Cold"];
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [selectedTemperatures, setSelectedTemperatures] = useState([]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            http.get(`/product/${id}`).then((res) => {
                const fetchedProduct = res.data;
            setProduct(fetchedProduct); // Set the product data
            setImageFile(fetchedProduct.imageFile); // Set image if exists
            setSelectedToppings(Array.isArray(fetchedProduct.toppings) ? fetchedProduct.toppings : []);
setSelectedTemperatures(Array.isArray(fetchedProduct.temperature) ? fetchedProduct.temperature : []);
                setLoading(false);
                console.log('Formik Initial Values:', fetchedProduct);
            }).catch((err) => {
                console.error('Error fetching product:', err);
                setLoading(false);
            });
        }
    }, [id]);
    
    const formik = useFormik({
        initialValues: product || {
        prod_name: product?.prod_name || '',
        price: product?.price || '',
        temperature: selectedTemperatures, // Ensure it's an array
        toppings: selectedToppings,
        description: product?.description || '',
        stock: product?.stock || ''
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            prod_name: yup.string().trim()
                .min(3, 'Name must be at least 3 characters')
                .max(100, 'Name must be at most 100 characters')
                .required('Name is required'),
            price: yup.number().positive('Price must be positive').required('Price is required'),
            stock: yup.number()
                .min(0, 'Stock must be at least 0')
                .required('Stock is required'),
            description: yup.string().trim().max(500, 'Description must be at most 500 characters'),
        }),
        onSubmit: (data) => {
            data.price = parseFloat(data.price);
            data.toppings = selectedToppings; // Save selected toppings as a comma-separated string
            data.temperature = selectedTemperatures; // Save selected temperatures as a comma-separated string
            console.log("Form submitted with data:", data);
            if (imageFile) {
                data.imageFile = imageFile;
            } else {
                data.ImageFile = null; // Ensure null is sent if no image is uploaded
            }
            http.put(`/product/${id}`, data)
                .then((res) => {
                    toast.success('Product updated successfully');
                    navigate("/products");
                })
                .catch((err) => {
                    console.error('Error updating product:', err.response || err); // Log the error to understand what's failing
                    toast.error('Failed to update product');
                });
        }
    });
    const handleToppingsChange = (event) => {
        const { target: { value } } = event;
        setSelectedToppings(Array.isArray(value) ? value : value.split(','));
    };

    const handleTemperaturesChange = (event) => {
        const { target: { value } } = event;
        setSelectedTemperatures(Array.isArray(value) ? value : value.split(','));
    };
    useEffect(() => {
        if (product) {
            formik.setValues({
                prod_name: product.prod_name || '',
                price: product.price || '',
                temperature: Array.isArray(product.temperature) ? product.temperature : [],
                toppings: Array.isArray(product.toppings) ? product.toppings : [],
                description: product.description || '',
                stock: product.stock || ''
            });
        }
    }, [product]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteProduct = () => {
        http.delete(`/product/${id}`)
            .then((res) => {
                toast.success('Product deleted successfully');
                navigate("/products");
            })
            .catch((err) => toast.error('Failed to delete product'));
    };

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
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => setImageFile(res.data.filename))
                .catch((err) => toast.error('Failed to upload image'));
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Product
            </Typography>
            {
                !loading && (
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                                <TextField
                                    fullWidth margin="dense" autoComplete="off"
                                    label="Product Name"
                                    name="prod_name"
                                    value={formik.values.prod_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.prod_name && Boolean(formik.errors.prod_name)}
                                    helperText={formik.touched.prod_name && formik.errors.prod_name}
                                />
                                <TextField
                                    fullWidth margin="dense" autoComplete="off"
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                                <FormControl fullWidth margin="dense">
                                    <InputLabel>Temperature</InputLabel>
                                    <Select
                                        multiple
                                        value={selectedTemperatures}
                                        onChange={handleTemperaturesChange}
                                        renderValue={(selected) => Array.isArray(selected) ? selected.join(', ') : ''}
                                    >
                                        {temperatureOptions.map((Temperature) => (
                                            <MenuItem key={Temperature} value={Temperature}>
                                                <Checkbox checked={selectedTemperatures.includes(Temperature)} />
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
                                        renderValue={(selected) => Array.isArray(selected) ? selected.join(', ') : ''}
                                    >
                                        {predefinedToppings.map((Toppings) => (
                                            <MenuItem key={Toppings} value={Toppings}>
                                                <Checkbox checked={selectedToppings.includes(Toppings)} />
                                                <ListItemText primary={Toppings} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth margin="dense" autoComplete="off"
                                    label="Description"
                                    name="description"
                                    multiline minRows={2}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                                <TextField
                                    fullWidth margin="dense" autoComplete="off"
                                    label="Stock"
                                    name="stock"
                                    type="number"
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.stock && Boolean(formik.errors.stock)}
                                    helperText={formik.touched.stock && formik.errors.stock}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <Box sx={{ textAlign: 'center', mt: 2 }} >
                                    <Button variant="contained" component="label">
                                        Upload Image
                                        <input hidden accept="image/*" type="file"
                                            onChange={onFileChange} />
                                    </Button>
                                    {
                                        imageFile && (
                                            <Box sx={{ mt: 2 }}>
                                                <img alt="product"
                                                    src={`${import.meta.env.VITE_FILE_BASE_URL}${imageFile}`}
                                                    style={{ width: '100%', height: 'auto' }} />
                                            </Box>
                                        )
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" type="submit">
                                Update
                            </Button>
                            <Button variant="contained" sx={{ ml: 2 }} color="error"
                                onClick={handleOpen}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                )
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Product
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={deleteProduct}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </Box>
    );
}

export default EditProduct;
