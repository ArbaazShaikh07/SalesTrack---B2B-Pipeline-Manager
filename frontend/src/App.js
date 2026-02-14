import { useState, useEffect } from 'react';
import './App.css';
import DashboardSummary from './components/DashboardSummary';
import PipelineBoard from './components/PipelineBoard';
import LeadForm from './components/LeadForm';
import AnalyticsSection from './components/AnalyticsSection';

const SAMPLE_LEADS = [
  {
    id: '1',
    companyName: 'TechVista Solutions',
    industry: 'Manufacturing',
    companySize: '250-500',
    contactPerson: 'Rajesh Kumar',
    contactEmail: 'rajesh.kumar@techvista.in',
    serviceType: 'Cloud',
    estimatedDealValue: 2500000,
    probability: 75,
    stage: 'Proposal Sent',
    nextFollowUpDate: '2025-01-15',
    objectionType: 'None'
  },
  {
    id: '2',
    companyName: 'MediCare Systems Pvt Ltd',
    industry: 'Healthcare',
    companySize: '100-250',
    contactPerson: 'Priya Sharma',
    contactEmail: 'priya.sharma@medicare.in',
    serviceType: 'Security',
    estimatedDealValue: 1800000,
    probability: 45,
    stage: 'Discovery Done',
    nextFollowUpDate: '2024-12-28',
    objectionType: 'Budget'
  },
  {
    id: '3',
    companyName: 'FinEdge Analytics',
    industry: 'Financial Services',
    companySize: '500+',
    contactPerson: 'Amit Verma',
    contactEmail: 'amit.verma@finedge.com',
    serviceType: 'DaaS',
    estimatedDealValue: 4200000,
    probability: 85,
    stage: 'Negotiation',
    nextFollowUpDate: '2025-01-05',
    objectionType: 'Technical'
  }
];

function App() {
  const [leads, setLeads] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    const storedLeads = localStorage.getItem('bdPipelineLeads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    } else {
      setLeads(SAMPLE_LEADS);
      localStorage.setItem('bdPipelineLeads', JSON.stringify(SAMPLE_LEADS));
    }
  }, []);

  const saveLeads = (updatedLeads) => {
    setLeads(updatedLeads);
    localStorage.setItem('bdPipelineLeads', JSON.stringify(updatedLeads));
  };

  const handleAddLead = (lead) => {
    const newLead = { ...lead, id: Date.now().toString() };
    saveLeads([...leads, newLead]);
  };

  const handleEditLead = (lead) => {
    const updatedLeads = leads.map(l => l.id === lead.id ? lead : l);
    saveLeads(updatedLeads);
    setEditingLead(null);
  };

  const handleDeleteLead = (id) => {
    const updatedLeads = leads.filter(l => l.id !== id);
    saveLeads(updatedLeads);
  };

  const handleStageChange = (leadId, newStage) => {
    const updatedLeads = leads.map(l => 
      l.id === leadId ? { ...l, stage: newStage } : l
    );
    saveLeads(updatedLeads);
  };

  const openEditForm = (lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingLead(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>BD Pipeline Pro</h1>
        <button 
          className="add-lead-btn"
          onClick={() => setIsFormOpen(true)}
          data-testid="add-lead-btn"
        >
          + Add Lead
        </button>
      </header>

      <div className="app-container">
        <DashboardSummary leads={leads} />
        <PipelineBoard 
          leads={leads} 
          onStageChange={handleStageChange}
          onEdit={openEditForm}
          onDelete={handleDeleteLead}
        />
        <AnalyticsSection leads={leads} />
      </div>

      {isFormOpen && (
        <LeadForm
          lead={editingLead}
          onSave={editingLead ? handleEditLead : handleAddLead}
          onClose={closeForm}
        />
      )}
    </div>
  );
}

export default App;
