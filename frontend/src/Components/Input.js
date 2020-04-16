import React,{ useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {useField} from '@unform/core';

export default function Input({ name, ...rest }) {
  const [inp, setInp] = useState('')
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input  ref={inputRef} onChange={(e)=>setInp(e.target.value)} defaultValue={defaultValue} {...rest} id="outlined-basic" label={rest.label} variant="outlined" />
      <br />
      <br />
    </>
  ) 
  
}