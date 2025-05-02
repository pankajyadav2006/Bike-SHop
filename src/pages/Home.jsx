import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import { 
  DirectionsBike, 
  Security, 
  LocalShipping, 
  Support, 
  Speed, 
  ThumbUp, 
  Star 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const features = [
  {
    icon: <DirectionsBike sx={{ fontSize: 40 }} />,
    title: 'Premium Bikes',
    description: 'High-quality bikes from top manufacturers',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Secure Shopping',
    description: 'Safe and secure payment options',
  },
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping service',
  },
  {
    icon: <Support sx={{ fontSize: 40 }} />,
    title: '24/7 Support',
    description: 'Round-the-clock customer assistance',
  },
];

const testimonials = [
  {
    name: 'Rahul Singh',
    comment: 'The quality of bikes at Leopard is outstanding. I purchased a racing bike last month and have never been happier!',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    comment: 'Excellent customer service and great selection of products. Their delivery was faster than expected.',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    comment: 'I love my new mountain bike. The staff was very helpful in helping me choose the right one for my needs.',
    rating: 4,
  },
];

const bikeCategories = [
  {
    title: 'Road Bikes',
    description: 'Built for speed on paved roads',
    image: '/img/bike1.jpg',
    link: '/shop'
  },
  {
    title: 'Mountain Bikes',
    description: 'Designed for off-road adventures',
    image: '/img/bike2.jpg',
    link: '/shop'
  },
  {
    title: 'Racing Bikes',
    description: 'Professional bikes for competitions',
    image: '/img/bike3.jpg',
    link: '/shop'
  },
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
                  Welcome to BikeVerse
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                  Discover our collection of premium bikes and accessories
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/shop"
                  sx={{ mr: 2 }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component="a"
                  href="#categories"
                >
                  Explore Categories
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  component="img"
                  src="/img/bike1.jpg"
                  alt="Hero Bike"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Categories */}
      <Container id="categories" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6 }}>
          Featured Categories
        </Typography>
        <Grid container spacing={4}>
          {bikeCategories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
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
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      pt: '60%', // Maintain aspect ratio
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={category.image}
                      alt={category.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {category.description}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to={category.link}
                      variant="outlined"
                      color="primary"
                    >
                      Shop {category.title}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Special Offer Banner */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 4, my: 6 }}>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" align="center" sx={{ mb: 2 }}>
              SPECIAL OFFER
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 3 }}>
              Get 15% off on all BikeVerse products this month. Use code: RIDE15
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/shop"
                sx={{ color: 'white', bgcolor: 'black' }}
              >
                Shop Now
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6 }}>
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
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
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h3" align="center" sx={{ mb: 6 }}>
            Customer Testimonials
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} color="secondary" />
                      ))}
                    </Box>
                    <Typography paragraph sx={{ fontStyle: 'italic', mb: 2 }}>
                      "{testimonial.comment}"
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {testimonial.name}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Ready to Ride?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
          Visit our shop to find your perfect bike and accessories today
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/shop"
          sx={{ px: 4, py: 1.5 }}
        >
          Shop the Collection
        </Button>
      </Container>
    </Box>
  );
};

export default Home; 