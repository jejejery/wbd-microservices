import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Box, VStack, Select, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Navbar from "../../components/Navbar/Navbar";
import { restUrl, authHeader} from '../../config/configs';
import axios from 'axios';

const Subscription: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const packageOptions = [
    {
      name: '1 Month',
      price: 'Rp50.000',
      description: (
        <>
          <FaCheck/> Mendengarkan musik bebas iklan.<br />
          <FaCheck/> Nikmati sesi mendengarkan bersama.<br />
          <FaCheck/> Download hingga 10.000 lagu perangkat di lima perangkat.<br />
          <FaCheck/> Pilihan prabayar atau berlangganan.
        </>
      ),
    },
    {
      name: '3 Months',
      price: 'Rp100.000',
      description: (
        <>
          <FaCheck/> Semua fitur dari paket 1 bulan.<br />
          <FaCheck/> Hemat lebih banyak dengan berlangganan 3 bulan.<br />
          <FaCheck/> Akses eksklusif ke konten premium.<br />
          <FaCheck/> Pilihan prabayar atau berlangganan.
        </>
      ),
    },
    {
      name: '1 Year',
      price: 'Rp300.000',
      description: (
        <>
          <FaCheck/> Langganan tahunan dengan diskon ekstra.<br />
          <FaCheck/> Nikmati musik tanpa batas sepanjang tahun.<br />
          <FaCheck/> Download tak terbatas di lima perangkat.<br />
          <FaCheck/> Pilihan prabayar atau berlangganan.
        </>
      ),
    },
  ];

  const paymentMethodOptions = ['Credit Card', 'PayPal', 'Bank Transfer'];

  const handlePackageChange = (value: string) => {
    setSelectedPackage(value);
  };

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  const handleSubmit = async (event :any) => {
    /* Penanganan submisi form subscription */
    event.preventDefault();

    // Cek apakah saldo pengguna cukup
    
    try {
      if (selectedPackage === '') {
        alert('Select a package first !');
      } else if (selectedPaymentMethod === '') {
        alert('Select a payment method first !');
      } else {
        //periksa apakah saldo mencukupi?
        const saldo = localStorage.getItem('credits');
        if (saldo === null || parseInt(saldo) < 50000) {
          alert('Insufficient credits. Please top up first.');
          return;
        }

        // Tentukan tanggal akhir berdasarkan paket yang dipilih
        if ((selectedPackage === '1 Month' && parseInt(saldo) < 50000) || (selectedPackage === '3 Months' && parseInt(saldo) < 100000) || (selectedPackage === '1 Year' && parseInt(saldo) < 300000)) {
          alert('Insufficient credits. Please top up first.');
          return;
        }
        
        
        // Periksa apakah pengguna sudah merupakan pelanggan premium
        // Jika sudah, lakukan perpanjangan langganan
        const getPremUserUrl = `${restUrl}/getPremiumUserByID?uID=${localStorage.getItem('user_id')}`;
        var currentDate;
        var userExists = false;
        var startDate;
        var year,month,day;
        if (localStorage.getItem('is_premium') === 'true') {
          // Ambil tanggal akhir langganan jika pengguna sudah merupakan pelanggan premium
          const userExistRes = await axios.get(getPremUserUrl);
          currentDate = new Date(userExistRes.data.end_date);
          userExists = true;
          startDate = userExistRes.data.start_date;
        } else {
          // Ambil tanggal saat ini jika pengguna pengguna premium
          currentDate = new Date();
          year = currentDate.getFullYear();
          month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
          day = String(currentDate.getDate()).padStart(2, '0');
          startDate = `${year}-${month}-${day}`;
        }

        // Tentukan tanggal akhir berdasarkan paket yang dipilih
        if (selectedPackage === '1 Month') {
          currentDate.setMonth(currentDate.getMonth() + 1);
          localStorage.setItem('credits', (parseInt(saldo) - 50000).toString());
        } else if (selectedPackage === '3 Months') {
          currentDate.setMonth(currentDate.getMonth() + 3);
          localStorage.setItem('credits', (parseInt(saldo) - 100000).toString());
        } else {
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          localStorage.setItem('credits', (parseInt(saldo) - 300000).toString());
        }

        year = currentDate.getFullYear();
        month = String(currentDate.getMonth() + 1).padStart(2, '0');
        day = String(currentDate.getDate()).padStart(2, '0');

        const endDate = `${year}-${month}-${day}`;

        const subscribeData = {
          uID : localStorage.getItem('user_id'),
          start : startDate,
          end : endDate
        };

        const header = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        var response;
        if (!userExists) {
          // Tambah user baru
          const addPremUserUrl = `${restUrl}/addPremUser`;
          response = await axios.post(addPremUserUrl, subscribeData, header);
        } else {
          // Perpanjang subscription
          const updtPremUserUrl = `${restUrl}/updatePremUser`;
          response = await axios.put(updtPremUserUrl, subscribeData, header);
        }

        // jangan lupa:
        // 1. update user premium di rest
        // 2. generate random string untuk referral code
        
        const subscribeUrl = `${restUrl}/subscription`;
        const subscribeData2 = {
            credits: parseInt(localStorage.getItem('credits')!),
            referral_code: Math.random().toString(36).substring(2, 27)
        }
        
        response = await axios.post(subscribeUrl, subscribeData2, authHeader);


        if (response.status === 200) {
          if (!userExists) {
            alert ('Subscription successful. Welcome to premium!');
            localStorage.setItem('is_premium', 'true');
          } else {
            alert('Subscription extension successful');
          }
          alert('Your referral code is ' + subscribeData2.referral_code);
        } else {
          alert ('Subscription failed with error code' + response.status + ' : ' + response.statusText);
        }
      }
    } catch(e : any) {
      alert("Error when subscribing." + "\n" + e);
    }
  };

  return (
    <><Navbar search='' /><Flex direction='column' align='center' height='100vh'>
      {/* Subscription Packages */}
      <Flex direction='column' align='center' justifyContent='center' p={[4, 8]}>

        {/* Responsive Heading */}
        <Heading color='white' mb={[4, 8]}>
          Choose a Subscription Package
        </Heading>

        <Flex
          direction={['column', 'column', 'row']}
          align={['center', 'center', 'stretch']}
          p={[4, 4]}
          justify='center'
          flexWrap={['wrap', 'wrap', 'nowrap']}
        >
          {packageOptions.map((option, index) => (
            <Box
              key={index}
              border="2px"
              borderColor='white'
              borderRadius="md"
              p={4}
              cursor="pointer"
              onClick={() => handlePackageChange(option.name)}
              width={['80vw', '100vw']}
              maxW={['80vw', '60vh']}
              color="white"
              bg={selectedPackage === option.name ? '#24D06' : 'black'}
              _hover={{ bg: '#24D06' }}
              transition="background 0.3s"
              mb={[4, 4, 0]}
              mr={[0, 0, 4]}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <VStack>
                <Text fontSize={['md', 'xl']}>{option.name}</Text>
                <Text fontWeight="bold" fontSize={['lg', '2xl']}>{option.price}</Text>
                <Box borderTop="1px" width="100%" my={4}></Box>
                <Text fontSize={['sm', 'md']} textAlign="left" whiteSpace="pre-line">{option.description}</Text>
              </VStack>
            </Box>
          ))}
        </Flex>

      </Flex>

      {/* Payment Method Dropdown */}
      <Flex direction='column' align='center' mt={-5}>
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

      {/* Submit Button */}
      <Box mt={[4, 4]}>
        <Button bg='#24D062' onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Flex></>
  );
};

export default Subscription;
