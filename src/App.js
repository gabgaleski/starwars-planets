import React from 'react';
import './App.css';
import Table from './Components/Table';
import Filters from './Components/Filters';
import FiltersTable from './Components/FiltersTable';

function App() {
  return (
    <div>
      <Filters />
      <FiltersTable />
      <Table />
    </div>
  );
}

export default App;
