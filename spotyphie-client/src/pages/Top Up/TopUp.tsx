import React, { useState } from 'react';
import { Box, Flex, Heading, Text, Select, Input, Button } from '@chakra-ui/react';
import Navbar from "../../components/Navbar/Navbar";
import axios, { AxiosError } from 'axios';
import { restUrl, authHeader} from '../../config/configs';
import CookieManager from '../../auth/cookie';

const TopUp: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Mock user data
  const username = localStorage.getItem('username') || 'User';

  const paymentMethodOptions = ['Credit Card', 'PayPal', 'Bank Transfer'];

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  const handleAccountNumberChange = (value: string) => {
    if (/^\d+$/.test(value) || value === '') {
      setAccountNumber(value);
    } else {
      setError('Account number can only contain numbers');
    }
  };

  const handleAmountChange = (value: string) => {
    if (value === '' || (parseInt(value) > 0 && !isNaN(parseInt(value)))) {
        setAmount(value);
        setError('');
      } else {
        setError('Top-up amount must be greater than 0');
      }
  };

  const  handleSubmit = async () => {
    try{
        // Validation
      if (!selectedPaymentMethod) {
        setError('Select a payment method');
        return;
      }

      if (!accountNumber) {
        setError('Enter an account number');
        return;
      }

      if (!amount) {
        setError('Enter the top-up amount');
        return;
      }

      // Logic to handle top-up submission
      console.log('Selected Payment Method:', selectedPaymentMethod);
      console.log('Account Number:', accountNumber);
      console.log('Top-up Amount:', amount);

      // Reset error message after successful submission
      setError('');

      const topUpUrl = `${restUrl}/topup`;
      const topUpHeader = authHeader;

      const topUpData = {
        user_id: parseInt(localStorage.getItem('user_id') as string),
        value: parseInt(amount),
      }

      const res = await axios.patch(topUpUrl, topUpData, topUpHeader);
      if (res.status === 200) {
        alert('Top-up success!');
      }
      let x = parseInt(localStorage.getItem('credits') as string) + parseInt(amount);
      localStorage.setItem('credits',  x.toString());
      window.location.reload()
    }
    catch(e : any){
      if(e.response.status === 401){
        alert('top up failed! token is deprecated!');
      }
      else if(e.response.status === 403){
        alert('top up failed! invalid token!');
      }
        localStorage.clear();
        window.location.href = '/';
    }
  };

  return (
    <>
      <Navbar search='' />
      <Flex direction='column' align='center' height='100vh'>
        {/* Top-Up Form */}
        <Box p={[4, 8]} width={['80vw', '60vw']} maxW={['80vw', '60vw']}>
          {/* Heading with Username */}
          <Heading color='white' mb={[4, 8]} textAlign="center">Hi! {username}</Heading>
          {/* Current Balance */}
          <Text color='white' mb={[4, 8]} textAlign="center">Your Current Balance: {localStorage.getItem('credits')}</Text>

          {error && (
            <Text color='red' mb={[4, 8]} textAlign="center">{error}</Text>
          )}

          {/* Payment Method Dropdown */}
          <Flex direction='column' mb={[4, 8]}>
            <Text color='white' mb={2}>Select Payment Method</Text>
            <Select
              placeholder="Select Payment Method"
              value={selectedPaymentMethod}
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
              color="black"
              bg="white"
            >
              {paymentMethodOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Flex>

          {/* Account Number */}
          <Flex direction='column' mb={[4, 8]}>
            <Text color='white' mb={2}>Enter Account Number</Text>
            <Input
              type="text"
              value={accountNumber}
              onChange={(e) => handleAccountNumberChange(e.target.value)}
              color="black"
              bg="white" />
          </Flex>

          {/* Top-Up Amount */}
          <Flex direction='column' mb={[4, 8]}>
            <Text color='white' mb={2}>Enter Top-Up Amount</Text>
            <Input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              color="black"
              bg="white" />
          </Flex>

          {/* Submit Button */}
          <Flex direction='column' mb={[4, 8]} justifyContent="center" alignItems="center">
            <Button colorScheme="green" color="black" onClick={handleSubmit}>Submit</Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default TopUp;
