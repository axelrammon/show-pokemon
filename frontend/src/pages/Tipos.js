import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    alignContent: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function Tipos() {
  
  const [ pokemons, setPokemons ] = useState([]);
  const [ pokemonsType, setPokemonsType ] = useState([]);
  const [ pagina, setPagina ] = useState('');


  const classes = useStyles();
  
  useEffect(() => {
    async function fetchData() {
      const types = await fetch('https://pokeapi.co/api/v2/type');
      const pokemonsType = await types.json();
      
      setPokemonsType(pokemonsType.results);
    }
    fetchData();
  }, [])
  
  function FormRow() {
    return (
      <React.Fragment>
        {pokemonsType.map(type => {
          return(
            <Grid item xs={2}>
              <Paper className={classes.paper} key={type.name}>{type.name}</Paper>
            </Grid>
          )
        })}
      </React.Fragment>
    );
  }
  
  return (
    <>
      <div className="cabecalho">
        <h1>Tipos</h1>
      </div>

      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={4}>
            <FormRow />
          </Grid>
        </Grid>
      </div>

      <div className="botoes">
        <Button variant="contained" color="primary">
          <Link to="/pokemons">
            Pokemons
          </Link>
        </Button>
      </div>
    </>
  );
}

export default Tipos;
