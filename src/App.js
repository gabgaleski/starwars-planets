import React from 'react';
import './App.css';
import TableList from './Components/Table';
import Filters from './Components/Filters';
import FiltersTable from './Components/FiltersTable';
import grafismoTopo from './Images/grafismoTopo.svg';
import logoTitle from './Images/logoTitle.svg';

function App() {
  return (
    <main>
      <img src={ grafismoTopo } alt="grafismo" />
      <img className="logoTitleImg" src={ logoTitle } alt="Logo StarWars" />
      <Filters />
      <FiltersTable />
      <TableList />
    </main>
  );
}

export default App;
