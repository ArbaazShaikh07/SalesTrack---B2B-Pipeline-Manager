import { useState, useEffect } from 'react';
import './App.css';
import DashboardSummary from './components/DashboardSummary';
import PipelineBoard from './components/PipelineBoard';
import LeadForm from './components/LeadForm';
import AnalyticsSection from './components/AnalyticsSection';

const DATA_VERSION = '2.0';

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
  },
  {
    id: '4',
    companyName: 'RetailHub India',
    industry: 'Retail',
    companySize: '500+',
    contactPerson: 'Anita Desai',
    contactEmail: 'anita.d@retailhub.in',
    serviceType: 'Cloud',
    estimatedDealValue: 3500000,
    probability: 90,
    stage: 'Closed Won',
    nextFollowUpDate: '2025-02-01',
    objectionType: 'None'
  },
  {
    id: '5',
    companyName: 'EduTech Learning Solutions',
    industry: 'Education',
    companySize: '100-250',
    contactPerson: 'Vikram Malhotra',
    contactEmail: 'vikram@edutech.co.in',
    serviceType: 'AMC',
    estimatedDealValue: 950000,
    probability: 25,
    stage: 'Prospecting',
    nextFollowUpDate: '2025-01-08',
    objectionType: 'Budget'
  },
  {
    id: '6',
    companyName: 'AutoParts Logistics',
    industry: 'Automotive',
    companySize: '250-500',
    contactPerson: 'Suresh Iyer',
    contactEmail: 'suresh.iyer@autoparts.com',
    serviceType: 'Security',
    estimatedDealValue: 2200000,
    probability: 65,
    stage: 'Proposal Sent',
    nextFollowUpDate: '2025-01-12',
    objectionType: 'Existing Vendor'
  },
  {
    id: '7',
    companyName: 'GreenEnergy Corp',
    industry: 'Energy',
    companySize: '500+',
    contactPerson: 'Meera Krishnan',
    contactEmail: 'meera@greenenergy.in',
    serviceType: 'Cloud',
    estimatedDealValue: 5800000,
    probability: 55,
    stage: 'Discovery Done',
    nextFollowUpDate: '2025-01-10',
    objectionType: 'Technical'
  },
  {
    id: '8',
    companyName: 'FashionForward Brands',
    industry: 'Fashion & Apparel',
    companySize: '50-100',
    contactPerson: 'Rohan Kapoor',
    contactEmail: 'rohan@fashionforward.in',
    serviceType: 'DaaS',
    estimatedDealValue: 1200000,
    probability: 35,
    stage: 'Contacted',
    nextFollowUpDate: '2024-12-30',
    objectionType: 'Timing'
  },
  {
    id: '9',
    companyName: 'PharmaCare Distributors',
    industry: 'Pharmaceuticals',
    companySize: '250-500',
    contactPerson: 'Dr. Kavita Reddy',
    contactEmail: 'kavita@pharmacare.in',
    serviceType: 'AMC',
    estimatedDealValue: 1650000,
    probability: 70,
    stage: 'Negotiation',
    nextFollowUpDate: '2025-01-06',
    objectionType: 'None'
  },
  {
    id: '10',
    companyName: 'UrbanBuild Constructions',
    industry: 'Real Estate',
    companySize: '100-250',
    contactPerson: 'Arun Mehta',
    contactEmail: 'arun.m@urbanbuild.com',
    serviceType: 'Security',
    estimatedDealValue: 2800000,
    probability: 80,
    stage: 'Negotiation',
    nextFollowUpDate: '2025-01-07',
    objectionType: 'None'
  },
  {
    id: '11',
    companyName: 'FoodChain Express',
    industry: 'Food & Beverage',
    companySize: '100-250',
    contactPerson: 'Sneha Patel',
    contactEmail: 'sneha@foodchain.in',
    serviceType: 'Cloud',
    estimatedDealValue: 1400000,
    probability: 40,
    stage: 'Discovery Done',
    nextFollowUpDate: '2024-12-25',
    objectionType: 'Budget'
  },
  {
    id: '12',
    companyName: 'TravelEase Solutions',
    industry: 'Travel & Tourism',
    companySize: '50-100',
    contactPerson: 'Karan Singh',
    contactEmail: 'karan@travelease.co.in',
    serviceType: 'DaaS',
    estimatedDealValue: 800000,
    probability: 20,
    stage: 'Contacted',
    nextFollowUpDate: '2025-01-14',
    objectionType: 'Existing Vendor'
  },
  {
    id: '13',
    companyName: 'DataVault Technologies',
    industry: 'IT Services',
    companySize: '250-500',
    contactPerson: 'Rahul Joshi',
    contactEmail: 'rahul@datavault.in',
    serviceType: 'Security',
    estimatedDealValue: 3200000,
    probability: 15,
    stage: 'Closed Lost',
    nextFollowUpDate: '2025-02-15',
    objectionType: 'Budget'
  },
  {
    id: '14',
    companyName: 'AgroFresh Exports',
    industry: 'Agriculture',
    companySize: '100-250',
    contactPerson: 'Deepa Nair',
    contactEmail: 'deepa@agrofresh.com',
    serviceType: 'AMC',
    estimatedDealValue: 1100000,
    probability: 50,
    stage: 'Proposal Sent',
    nextFollowUpDate: '2025-01-09',
    objectionType: 'Timing'
  },
  {
    id: '15',
    companyName: 'FinSecure Banking Solutions',
    industry: 'BFSI',
    companySize: '500+',
    contactPerson: 'Sanjay Gupta',
    contactEmail: 'sanjay.g@finsecure.in',
    serviceType: 'Security',
    estimatedDealValue: 6500000,
    probability: 92,
    stage: 'Closed Won',
    nextFollowUpDate: '2025-02-05',
    objectionType: 'None'
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
