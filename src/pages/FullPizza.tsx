import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<
    | {
        imageUrl: string;
        title: string;
        price: number;
      }
    | undefined
  >();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const { data } = await axios.get(`https://62ab87fba62365888bde013d.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('We could not find any pizza');
        navigate('/');
      }
    };
    fetchPizzas();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <p>{pizza.title}</p>
      <p>{pizza.price} ₽</p>
    </div>
  );
};
