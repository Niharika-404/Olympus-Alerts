

import React, { useState, useEffect } from 'react';
import SideContainer from './SideContainer';
import AlertsTable from './AlertsTable';
import Title from './Title';
import NewDashboard from './NewDashboard';
import OlympusNonOlympus from './OlympusNonOlympus';

const Main = ({ loading, alertData, handleRefresh, onStartDateChange, onEndDateChange, start, end, responders, onResponderChange, selectedResponder, handleSearch, category,  onCategoryChange, olympusData, nonOlympusData, trendData, priorityTrendData, activeTab, handleTabChange, alertsLoading, handleDashboardData, dashboardData, showClassifyButton, handleClassifyClick, alertModelData, olympusModelData, nonOlympusModelData, showClassifyButtonForOly, handleClassifyOlyClick }) => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');
  // const [activeTab, setActiveTab] = useState('Alerts');

  
  
  const handleTabClick = (tab) => {
    handleTabChange(tab);
  };


  
 console.log('Dashboard data - ',dashboardData);

  return (
    <div>
      <Title alertData={alertData} selectedResponder={selectedResponder} activeTab={activeTab} handleDashboardData={handleDashboardData} />
      <div className="tabs">
          <div className={activeTab === 'Alerts' ? 'active' : ''} onClick={() => handleTabClick('Alerts')}>Alerts</div>
          <div 
    className={activeTab === 'Dashboard' ? 'active' : ''} 
    style={{
        borderLeft: '1px solid gray',
        borderRight: '1px solid gray'
    }} 
    onClick={() => { handleTabClick('Dashboard')}}
>
    Dashboard
</div>

          <div className={activeTab === 'Olympus' ? 'active' : ''} onClick={() => handleTabClick('Olympus')}>Olympus/Non-Olympus</div>

        </div>
      <div id='mainContainer'>
      
        {activeTab === 'Alerts' && (
          <div id='alerttable-count'>
            <AlertsTable
              loading={alertsLoading}
              alertData={alertData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              responders={responders}
              selectedResponder={selectedResponder}
              onResponderChange={onResponderChange}

              category={category}
              onCategoryChange={onCategoryChange}
              alertModelData={alertModelData}

              // selZone={selZone}
              // selectedPriority={selectedPriority}
              // Dashboardstatus={status}
            />
            <SideContainer
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              start={start}
              end={end}
              loading={alertsLoading}
              alertData={alertData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleRefresh={handleRefresh}
              handleSearch={handleSearch}
              selectedResponder={selectedResponder}
              activeTab={activeTab}
              olympusData={olympusData}
              nonOlympusData={nonOlympusData}
              category={category}
              trendData={trendData}
              priorityTrendData={priorityTrendData}
              showClassifyButton={showClassifyButton}
              handleClassifyClick={handleClassifyClick}
              olympusModelData={olympusModelData}
              nonOlympusModelData={nonOlympusModelData}
              alertModelData={alertModelData}
              showClassifyButtonForOly={showClassifyButtonForOly}
              handleClassifyOlyClick={handleClassifyOlyClick}

            
            />
          </div>
        )}
        {activeTab === 'Dashboard' && ( dashboardData==='Alerts' ? 
          <NewDashboard alertData={alertData} alertModelData={alertModelData}/> : dashboardData==='Olympus' ? 
          <NewDashboard alertData={olympusData} alertModelData={olympusModelData}/> : dashboardData==='Non-Olympus'?
          <NewDashboard alertData={nonOlympusData} alertModelData={nonOlympusModelData}/> : ''
        )}
          {activeTab === 'Olympus' && (
          <div id='alerttable-count'>
            <OlympusNonOlympus
              loading={loading}
              olympusData={olympusData}
              nonOlympusData={nonOlympusData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              responders={responders}
              selectedResponder={selectedResponder}
              onResponderChange={onResponderChange}

              dataCategory={category}
              onCategoryChange={onCategoryChange}
              olympusModelData={olympusModelData}
              nonOlympusModelData={nonOlympusModelData}

              // selZone={selZone}
              // selectedPriority={selectedPriority}
              // Dashboardstatus={status}
            />
            <SideContainer
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              start={start}
              end={end}
              loading={loading}
              alertData={alertData}
              olympusData={olympusData}
              nonOlympusData={nonOlympusData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleRefresh={handleRefresh}
              handleSearch={handleSearch}
              activeTab={activeTab}
              category={category}
              trendData={trendData}
              priorityTrendData={priorityTrendData}
              showClassifyButton={showClassifyButton}
              handleClassifyClick={handleClassifyClick}
              olympusModelData={olympusModelData}
              nonOlympusModelData={nonOlympusModelData}
              alertModelData={alertModelData}
              showClassifyButtonForOly={showClassifyButtonForOly}
              handleClassifyOlyClick={handleClassifyOlyClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
