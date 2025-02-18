import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid2 as Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccountCircle, AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import UserContext from '../contexts/UserContext';
import global from '../global';

function Products() {
    const [productList, setProductList] = useState([]);
    const [search, setSearch] = useState('');
    const { user } = useContext(UserContext);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getProducts = () => {
        http.get('/product').then((res) => {
            console.log("Products fetched from API:", res.data);
            setProductList(res.data);
        }).catch((err) => {
            console.error('Error fetching products:', err);
        });
    };

    const searchProducts = () => {
        http.get(`/product?search=${search}`).then((res) => {
            setProductList(res.data);
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchProducts();
        }
    };

    const onClickSearch = () => {
        searchProducts();
    };

    const onClickClear = () => {
        setSearch('');
        getProducts();
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Products
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                        <Link to="/addproduct">
                            <Button variant='contained'>
                                Add Product
                            </Button>
                        </Link>
            </Box>

            <Grid container spacing={2}>
                {
                    productList.map((product, i) => {
                        console.log("Rendering product:", product);
                        console.log(`/editproduct/${product.prod_id}`);
                        return (
                            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={product.prod_id}>
                                <Card>
                                    {
                                        product.imageFile && (
                                            <Box className="aspect-ratio-container">
                                                <img alt="product"
                                                    src={`${import.meta.env.VITE_FILE_BASE_URL}${product.imageFile}`}>
                                                </img>
                                            </Box>
                                        )
                                    }
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {product.prod_name}
                                            </Typography>
                                            {
                                                // user && user.id === product.userId && (
                                                    <Link to={`/editproduct/${product.prod_id}`}>
                                                        <IconButton color="primary" sx={{ padding: '4px' }}>
                                                            <Edit />
                                                        </IconButton>
                                                    </Link>
                                                // )
                                            }
                                        </Box>
                                        
                                        <Typography>
                                            Price: ${product.price.toFixed(2)}
                                        </Typography>
                                        <Typography>
                                            Stock: {product.stock}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {product.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

export default Products;
