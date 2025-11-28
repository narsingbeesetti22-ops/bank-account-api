import React from 'react';
import BankPortal from './components/BankPortal';
 
function App() {
  return (
    <div className="App">
      <BankPortal baseUrl="http://localhost:8051/api" />
    </div>
  );
}
 
export default App;
