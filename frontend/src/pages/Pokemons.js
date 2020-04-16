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


function Pokemon() {
  
  const [ pokemons, setPokemons ] = useState([]);
  const [ pokemonsType, setPokemonsType ] = useState([]);
  const [ pagina, setPagina ] = useState('');
  const [data, setData] = useState([]);


  const classes = useStyles();
  
  useEffect(() => {
    async function fetchData() {
      const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
      const pokemonsData = await pokemons.json();
      console.log(pokemonsData);
      setPagina(pokemonsData.next);
      
      setPokemons(pokemonsData.results);
    }
    fetchData();
  }, []);
  
  function FormRow() {
    return (
      <React.Fragment>
        {pokemons.map(pokemon => {
          return(
            <Grid item xs={2}>
              <Paper className={classes.paper} key={pokemon.name}>{pokemon.name}</Paper>
            </Grid>
          )
        })}
      </React.Fragment>
    );
  }
  async function next(url){
    let data = await fetch(url);
    data = await data.json();
    // console.log(data)
    setPagina(data.next)
    setPokemons([...data.results]);
  } 
  return (
    <>
      <div className="cabecalho">
        <h1>Pokemons</h1>
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
          <a onClick={() => next(pagina)}>Próxima</a>
        </Button>

        <Button variant="contained" color="primary">
          <Link to="/tipos">
            Tipos
          </Link>
        </Button>
      </div>
      

    </>
  );
}

export default Pokemon;
