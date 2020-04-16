import React from 'react';
import { useHistory, Link } from 'react-router-dom';
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
      // const schema = Yup.object().shape({
      //   email: Yup.string().email().required(),
      //   password: Yup.string().min(6).required(),
      // });
      // await schema.validate(data, {
      //   abortEarly: false,
      // });

      let response = await axios.post('/login', {

        email:data.email,
        password: data.password

      });
      if(response.data.token){
        localStorage.setItem('token', response.data.token)
        history.push('/pokemons');
      }
      console.log(response)
    } catch (err) {
      // if (err instanceof Yup.ValidationError) {
      //   console.log(err)
        
      // }
    }



  }
  return (
    <>
    <div className="form">
      <Form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" placeholder="Email"/>
        <Input label="Password" name="password" type="password" placeholder="Senha"/>
        <Button type="submit" variant="contained" color="primary">Sign in</Button>
        <Button type="button" variant="contained" color="primary">
          <Link to='/register'>
            Sign up
          </Link>
        </Button>
      </Form>
    </div>
    </>
  );
}