import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Email,
  Phone,
  LocationOn,
  KeyboardArrowRight,
  Code,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: 'black', color: 'white', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                mb: 2,
                display: 'block',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              BIKEVERSE
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, maxWidth: 300 }}>
              Delivering premium biking experiences since 2010. We offer high-quality bikes and accessories with excellent customer service.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton size="small" color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton size="small" color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton size="small" color="inherit" aria-label="YouTube">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <List disablePadding>
              {['Home', 'Shop', 'About Us', 'Contact', 'FAQs'].map((text) => (
                <ListItem
                  key={text}
                  disablePadding
                  disableGutters
                  sx={{ mb: 1 }}
                >
                  <KeyboardArrowRight sx={{ color: 'secondary.main', mr: 0.5, fontSize: 18 }} />
                  <Link
                    component={RouterLink}
                    to={text === 'Home' ? '/' : `/${text.toLowerCase().replace(' ', '-')}`}
                    color="inherit"
                    underline="hover"
                    sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                  >
                    {text}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Categories
            </Typography>
            <List disablePadding>
              {['Road Bikes', 'Mountain Bikes', 'Helmets', 'Accessories', 'Clothing'].map((text) => (
                <ListItem
                  key={text}
                  disablePadding
                  disableGutters
                  sx={{ mb: 1 }}
                >
                  <KeyboardArrowRight sx={{ color: 'secondary.main', mr: 0.5, fontSize: 18 }} />
                  <Link
                    component={RouterLink}
                    to="/shop"
                    color="inherit"
                    underline="hover"
                    sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                  >
                    {text}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact & Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter for the latest products and offers.
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Your Email"
                fullWidth
                sx={{
                  bgcolor: 'white',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                Subscribe
              </Button>
            </Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                123 Bike Street, New Delhi, India
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">+91 98765 43210</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">info@bikeverse.com</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} BikeVerse. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link href="#" color="inherit" underline="hover">
              <Typography variant="body2" color="text.secondary">
                Privacy Policy
              </Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover">
              <Typography variant="body2" color="text.secondary">
                Terms of Service
              </Typography>
            </Link>
          </Box>
        </Box>
        
        {/* Developer Credit */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
            <Code fontSize="small" /> Made with ❤️ by Pankaj Yadav
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 