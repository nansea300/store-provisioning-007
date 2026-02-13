import React from 'react';
import StoreList from './components/StoreList';
import CreateStore from './components/CreateStore';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Store Platform Dashboard</h1>
      <CreateStore />
      <StoreList />
    </div>
  );
}

export default App;
