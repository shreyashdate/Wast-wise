import { useState } from 'react';
import BinForm from '../components/BinForm';
import BinTable from '../components/BinTable';
import ComplaintForm from '../components/ComplaintForm';
import ComplaintTable from '../components/ComplaintTable';

const TABS = ['Bins', 'Complaints'];

function CitizenDashboard({ user }) {
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
          <BinTable key={refreshKey} isManager={false} />
        </>
      )}

      {activeTab === 'Complaints' && (
        <>
          <ComplaintForm onAdded={refresh} />
          <ComplaintTable key={refreshKey} isManager={false} />
        </>
      )}
    </div>
  );
}

export default CitizenDashboard;
