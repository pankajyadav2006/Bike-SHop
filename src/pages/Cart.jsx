import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Grid,
  Divider,
  Paper,
  TextField,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Add, Remove, Delete, ArrowBack, ShoppingBag, LocalShipping } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

const steps = ['Shopping Cart', 'Delivery Details', 'Payment', 'Confirmation'];

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'RIDE15') {
      setCouponApplied(true);
      setDiscount(Math.round(total * 0.15));
    } else {
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ maxWidth: 500, mx: 'auto' }}>
            <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.7 }} />
            <Typography variant="h4" sx={{ mb: 2 }}>
              Your cart is empty
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Looks like you haven't added any items to your cart yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/shop"
              startIcon={<ArrowBack />}
            >
              Continue Shopping
            </Button>
          </Box>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h2" align="center" sx={{ mb: 6 }}>
        Your Shopping Cart
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Cart Items ({items.length})
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card sx={{ mb: 2, display: 'flex', boxShadow: 'none' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 1 }}
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', p: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {item.brand}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          ₹{item.price.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Remove />
                        </IconButton>
                        <Typography sx={{ minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Add />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                  {index < items.length - 1 && <Divider sx={{ my: 2 }} />}
                </motion.div>
              ))}
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button 
                component={RouterLink} 
                to="/shop"
                startIcon={<ArrowBack />}
                sx={{ textTransform: 'none' }}
              >
                Continue Shopping
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => dispatch(clearCart())}
                sx={{ textTransform: 'none' }}
              >
                Clear Cart
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Coupon Code"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={handleApplyCoupon}
                  disabled={!couponCode}
                  fullWidth
                >
                  Apply Coupon
                </Button>
                {couponApplied && (
                  <Alert severity="success" sx={{ mt: 1 }}>
                    Coupon "RIDE15" applied successfully!
                  </Alert>
                )}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal</Typography>
                <Typography>₹{total.toLocaleString()}</Typography>
              </Box>
              
              {couponApplied && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, color: 'success.main' }}>
                  <Typography>Discount (15%)</Typography>
                  <Typography>-₹{discount.toLocaleString()}</Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Shipping</Typography>
                <Typography>{total > 10000 ? 'Free' : '₹500'}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  ₹{(total - discount + (total > 10000 ? 0 : 500)).toLocaleString()}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                onClick={handleNext}
                sx={{ py: 1.5 }}
              >
                Proceed to Checkout
              </Button>
              
              <Box sx={{ textAlign: 'center', mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <LocalShipping fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Free shipping on orders above ₹10,000
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {activeStep === 1 && (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Delivery Details Step
          </Typography>
          <Typography paragraph>
            This is a placeholder for the delivery details form.
            In a complete application, you would collect shipping information here.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back to Cart
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Continue to Payment
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 2 && (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Payment Step
          </Typography>
          <Typography paragraph>
            This is a placeholder for the payment form.
            In a complete application, you would collect payment information here.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Back to Delivery
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Complete Order
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 3 && (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
            Thank you for your order!
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your order has been placed successfully.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            BikeVerse - Created by Pankaj Yadav
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/shop"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart; 