import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../../Components/Input';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';

import './styles.css';

import axios from '../../services/api';

export default function Login() {
  
  const history = useHistory();
  
  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      let response = await axios.post('/register', {
        name:data.name,
        email:data.email,
        password: data.password

      });
      if(response.data.token){
        history.push('/pokemons');
      }
      console.log(response)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        alert("Erro");
      }
    }



  }
  return (
    <>
    <div className="form">
      <Form onSubmit={handleSubmit}>
        <Input label="Name" name="name" type="name" />
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </div>
    </>
  );
}