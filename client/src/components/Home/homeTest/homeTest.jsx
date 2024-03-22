import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useState } from 'react';
const VITE_URL_API = import.meta.env.VITE_URL_API;

const MercadoPagoTEST = () => {

  const email = '5JnKc@example.com';
  const PUBLIC_KEY = 'TEST-0df70b9d-f404-4046-b53b-2a93b40656c6';
  const cart = [
    {
      id: 'cde4d85b-8910-4b1f-9ae3-71b7d5c9f7f1',
      name: 'Camiseta de algodón',
      price: 1500,
      size: 'M',
      color: 'Blanco',
      description: 'Camiseta de algodón suave y cómoda.',
      adminId: 'b02881c9-7ef2-4c54-ae02-4831bebd5c6d',
      quantity: 1
    },
    {
      id: '6e583f2c-f796-4d2e-84c4-1b7d3e53b900',
      name: 'Pantalones vaqueros',
      price: 2500,
      size: 'L',
      color: 'Azul',
      description: 'Pantalones vaqueros modernos y duraderos.',
      adminId: 'a0b98e5a-632a-4c6f-91c7-72e0b0f4f92b',
      quantity: 2
    },
    {
      id: 'f73a4c4d-bf2e-4a19-aac2-f869cfc034e5',
      name: 'Zapatos deportivos',
      price: 2000,
      size: '42',
      color: 'Negro',
      description: 'Zapatos deportivos ideales para correr.',
      adminId: 'c11f5a7e-ef7d-47e3-8654-9b3e0cb849b2',
      quantity: 3
    }
  ];
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago(PUBLIC_KEY, { locale: 'es-AR' });

  const createReferenceId = async () => {
    try {

      let products = cart.map((item) => ({
        id: item.id,
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
      }));

      console.log(VITE_URL_API, 'VITE_URL_API');

      const { data } = await axios.post(`${VITE_URL_API}/create-order`, {
        products
      });

      console.log(data, 'data');

      return data.id;
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuy = async () => {
    const refernceID = await createReferenceId();
    if (refernceID) {
      setPreferenceId(refernceID);
    }
  }

  return (
    <div>
      <button onClick={handleBuy}>Comprar</button>
      {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
    </div>
  );
};

export default MercadoPagoTEST;