

import React, { useState } from 'react';
import DataTable from './DataTable';
import SideContainer from './SideContainer';

const Main = () => {
  const [selectedStatus, setSelectedStatus] = useState('');

  return (
    <div id='mainContainer'>
      <DataTable style={{ width: '70%' }} selectedStatus={selectedStatus} />
      <SideContainer
        style={{ width: '30%' }}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </div>
  );
}

export default Main;





