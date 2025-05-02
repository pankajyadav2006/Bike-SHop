import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Container,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  ShoppingCart,
  Menu as MenuIcon,
  Close,
  Person,
  DirectionsBike,
  Favorite,
  Home,
  Store,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'Shop', path: '/shop', icon: <Store /> },
    { text: 'Bikes', path: '/shop', icon: <DirectionsBike /> },
    { text: 'Wishlist', path: '/wishlist', icon: <Favorite /> },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center' }} onClick={handleDrawerToggle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
          BikeVerse
        </Typography>
        <IconButton color="inherit" onClick={handleDrawerToggle} edge="end">
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem disablePadding key={item.text}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                textAlign: 'left',
                py: 1.5,
                backgroundColor: isActive(item.path) ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
              }}
            >
              <Box sx={{ mr: 2, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </Box>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/cart"
            sx={{
              textAlign: 'left',
              py: 1.5,
              backgroundColor: isActive('/cart') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
            }}
          >
            <Box sx={{ mr: 2, color: isActive('/cart') ? 'primary.main' : 'inherit' }}>
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </Box>
            <ListItemText primary="Cart" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700,
              }}
            >
              <DirectionsBike sx={{ mr: 1, fontSize: 28 }} />
              BikeVerse
            </Typography>
          </motion.div>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
                sx={{
                  mx: 0.5,
                  position: 'relative',
                  fontWeight: isActive(item.path) ? 700 : 400,
                  '&::after': isActive(item.path)
                    ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '30%',
                        height: 2,
                        bgcolor: 'secondary.main',
                        borderRadius: 1,
                      }
                    : {},
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Right Side Items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Cart Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Tooltip title="Shopping Cart">
                <IconButton
                  color="inherit"
                  component={RouterLink}
                  to="/cart"
                  aria-label="shopping cart"
                  sx={{ ml: 1 }}
                >
                  <Badge badgeContent={itemCount} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Tooltip>
            </motion.div>

            {/* Account Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Tooltip title="Account">
                <IconButton color="inherit" sx={{ ml: 1 }}>
                  <Person />
                </IconButton>
              </Tooltip>
            </motion.div>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
            }}
          >
            {drawer}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 