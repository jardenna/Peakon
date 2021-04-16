import React from 'react';

import ManagerDropdown from './managersDropdown/ManagerDropdown';
import GithubState from '../context/github/GithubState';

function App() {
   return (
      <GithubState>
         <ManagerDropdown />
      </GithubState>
   );
}

export default App;
