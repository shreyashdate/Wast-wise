import { useState } from 'react';
import BinForm from '../components/BinForm';
import BinTable from '../components/BinTable';
import WorkerForm from '../components/WorkerForm';
import WorkerTable from '../components/WorkerTable';
import CollectionTable from '../components/CollectionTable';
import ComplaintTable from '../components/ComplaintTable';
import ComplaintForm from '../components/ComplaintForm';

const TABS = ['Bins', 'Workers', 'Collections', 'Complaints'];

function ManagerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('Bins');
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  return (
    <div>
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Bins' && (
        <>
          <BinForm onAdded={refresh} />
          <BinTable key={refreshKey} isManager={true} />
        </>
      )}

      {activeTab === 'Workers' && (
        <>
          <WorkerForm onAdded={refresh} />
          <WorkerTable key={refreshKey} />
        </>
      )}

      {activeTab === 'Collections' && <CollectionTable key={refreshKey} />}

      {activeTab === 'Complaints' && (
        <>
          <ComplaintForm onAdded={refresh} />
          <ComplaintTable key={refreshKey} isManager={true} />
        </>
      )}


    </div>
  );
}

export default ManagerDashboard;
