import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
  Slider,
  Paper,
  Rating,
  InputAdornment,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import { Search, FilterList } from '@mui/icons-material';

const products = [
  {
    id: 1,
    name: 'Sport Racing Bike',
    price: 150000,
    image: '/img/bike1.jpg',
    category: 'road',
    brand: 'BikeVerse',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: 'Premium MTB Helmet',
    price: 5000,
    image: '/img/bike.jpg',
    category: 'helmet',
    brand: 'ProGear',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 3,
    name: 'Carbon Alloy Wheels',
    price: 25000,
    image: '/img/bike2.jpg',
    category: 'parts',
    brand: 'SpeedMaster',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 4,
    name: 'Pro Racing Suit',
    price: 15000,
    image: '/img/bike3.jpg',
    category: 'clothing',
    brand: 'RiderPro',
    rating: 4.3,
    inStock: true,
  },
  {
    id: 5,
    name: 'Mountain Bike Extreme',
    price: 120000,
    image: '/img/bike2.jpg',
    category: 'mountain',
    brand: 'BikeVerse',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 6,
    name: 'City Cruiser Bike',
    price: 65000,
    image: '/img/bike1.jpg',
    category: 'city',
    brand: 'Urban Rides',
    rating: 4.2,
    inStock: true,
  },
  {
    id: 7,
    name: 'Cycling Gloves Pro',
    price: 2500,
    image: '/img/bike3.jpg',
    category: 'accessories',
    brand: 'RiderPro',
    rating: 4.0,
    inStock: true,
  },
  {
    id: 8,
    name: 'Professional Bike Lock',
    price: 3000,
    image: '/img/bike.jpg',
    category: 'accessories',
    brand: 'SecureLock',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 9,
    name: 'Competition Racing Bike',
    price: 280000,
    image: '/img/bike1.jpg',
    category: 'road',
    brand: 'SpeedMaster',
    rating: 5.0,
    inStock: false,
  },
];

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'road', label: 'Road Bikes' },
  { value: 'mountain', label: 'Mountain Bikes' },
  { value: 'city', label: 'City Bikes' },
  { value: 'helmet', label: 'Helmets' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'parts', label: 'Bike Parts' },
];

const brands = ['All Brands', 'Leopard', 'ProGear', 'SpeedMaster', 'RiderPro', 'Urban Rides', 'SecureLock'];

const Shop = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('All Brands');
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [sort, setSort] = useState('featured');

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProducts = products.filter(
    (product) =>
      (category === 'all' || product.category === category) &&
      (brand === 'All Brands' || product.brand === brand) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'priceLow') return a.price - b.price;
    if (sort === 'priceHigh') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0; // Default is 'featured'
  });

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h2" align="center" sx={{ mb: 6 }}>
        Shop Our Collection
      </Typography>

      <Grid container spacing={4}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, mb: { xs: 4, md: 0 } }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              <FilterList sx={{ mr: 1, verticalAlign: 'bottom' }} />
              Filters
            </Typography>

            {/* Search */}
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                label="Search Products"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Category Filter */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Category
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  displayEmpty
                  variant="outlined"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Brand Filter */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Brand
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  displayEmpty
                  variant="outlined"
                >
                  {brands.map((brandName) => (
                    <MenuItem key={brandName} value={brandName}>
                      {brandName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Price Range */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={300000}
                step={5000}
                valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2">₹{priceRange[0].toLocaleString()}</Typography>
                <Typography variant="body2">₹{priceRange[1].toLocaleString()}</Typography>
              </Box>
            </Box>

            {/* Sort */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Sort By
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  displayEmpty
                  variant="outlined"
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="priceLow">Price: Low to High</MenuItem>
                  <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Customer Rating</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          {/* Results summary */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography>
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            </Typography>
            {category !== 'all' && (
              <Chip
                label={categories.find(c => c.value === category)?.label}
                onDelete={() => setCategory('all')}
                color="primary"
              />
            )}
          </Box>

          {/* Product grid */}
          {sortedProducts.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6">No products found matching your criteria</Typography>
              <Button 
                sx={{ mt: 2 }} 
                variant="outlined" 
                onClick={() => {
                  setCategory('all');
                  setBrand('All Brands');
                  setSearchTerm('');
                  setPriceRange([0, 300000]);
                }}
              >
                Clear All Filters
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {sortedProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={product.image}
                          alt={product.name}
                        />
                        {!product.inStock && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              bgcolor: 'error.main',
                              color: 'white',
                              px: 2,
                              py: 0.5,
                              borderRadius: 1,
                            }}
                          >
                            Out of Stock
                          </Box>
                        )}
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                          {product.brand}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                          {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', mb: 1 }}>
                          <Rating value={product.rating} precision={0.1} size="small" readOnly />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            ({product.rating})
                          </Typography>
                        </Box>
                        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                          ₹{product.price.toLocaleString()}
                        </Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          disabled={!product.inStock}
                          onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Shop; 