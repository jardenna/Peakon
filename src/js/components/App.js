import React from 'react';

import ManagerDropdown from './managersDropdown/ManagerDropdown';
import State from '../context/managers/State';

function App() {
   return (
      <State>
         <ManagerDropdown />
      </State>
   );
}

export default App;
