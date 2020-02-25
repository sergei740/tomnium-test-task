import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  TextField
} from '@material-ui/core';

import data from './data';


const useStyles = makeStyles({
  container: {
    textAlign: 'center'
  },
  header: {
    fontSize: '35px',
    textTransform: 'upperCase',
    margin: '10px auto'
  },
  tableContainer: {
    width: '40%',
    margin: '20px auto 0'
  },
  textField: {
    width: '20%',
  }
});

function App() {
  const classes = useStyles();

  const [rates, setRates] = useState({});
  const [filteredRates, setFilteredRates] = useState(rates);

  const getData = () => Promise.resolve(data);

  useEffect(() => {
    getData().then(({ rates }) => setRates(rates));
  }, []);

  useEffect(() => {
    if (Object.keys(rates).length) {
      setFilteredRates(rates)
    }
  }, [rates]);

  const inputHandler = e => {
    const keys = Object.keys(rates).filter(item => {
      return item.toLowerCase().trim().indexOf(e.target.value) === 0
    });
    const filteredRates = keys.reduce((acc, item) => {
      return { ...acc, [item]: rates[item] }
    }, {});
    setFilteredRates(filteredRates);
  };

  return (
    <div className={classes.container}>
      <p className={classes.header}>currency exchange</p>
      <TextField className={classes.textField} label='Type currency' variant="outlined" onChange={inputHandler}/>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Сurrency</TableCell>
              <TableCell align="right">One dollar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(filteredRates).map(item => (
              <TableRow key={item}>
                <TableCell component="th" scope="row" align="left">
                  {item}
                </TableCell>
                <TableCell align="right">{filteredRates[item]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
