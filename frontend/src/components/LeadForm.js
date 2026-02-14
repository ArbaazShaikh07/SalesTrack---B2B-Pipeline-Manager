import { useState, useEffect } from 'react';

const SERVICE_TYPES = ['Cloud', 'AMC', 'Security', 'DaaS'];
const STAGES = [
  'Prospecting',
  'Contacted',
  'Discovery Done',
  'Proposal Sent',
  'Negotiation',
  'Closed Won',
  'Closed Lost'
];
const OBJECTION_TYPES = ['Budget', 'Existing Vendor', 'Timing', 'Technical', 'None'];

export const LeadForm = ({ lead, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    contactPerson: '',
    contactEmail: '',
    serviceType: 'Cloud',
    estimatedDealValue: '',
    probability: '',
    stage: 'Prospecting',
    nextFollowUpDate: '',
    objectionType: 'None'
  });

  useEffect(() => {
    if (lead) {
      setFormData(lead);
    }
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName) {
      alert('Company Name is required');
      return;
    }
    
    const dataToSave = {
      ...formData,
      estimatedDealValue: parseFloat(formData.estimatedDealValue) || 0,
      probability: parseFloat(formData.probability) || 0
    };
    
    onSave(dataToSave);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{lead ? 'Edit Lead' : 'Add New Lead'}</h2>
          <button className="close-btn" onClick={onClose} data-testid="close-form-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="lead-form">
          <div className="form-row">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                data-testid="input-company-name"
              />
            </div>

            <div className="form-group">
              <label>Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                data-testid="input-industry"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Company Size</label>
              <input
                type="text"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                placeholder="e.g., 100-250"
                data-testid="input-company-size"
              />
            </div>

            <div className="form-group">
              <label>Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                data-testid="input-contact-person"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                data-testid="input-contact-email"
              />
            </div>

            <div className="form-group">
              <label>Service Type</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                data-testid="select-service-type"
              >
                {SERVICE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Estimated Deal Value (₹)</label>
              <input
                type="number"
                name="estimatedDealValue"
                value={formData.estimatedDealValue}
                onChange={handleChange}
                data-testid="input-deal-value"
              />
            </div>

            <div className="form-group">
              <label>Probability (%)</label>
              <input
                type="number"
                name="probability"
                value={formData.probability}
                onChange={handleChange}
                min="0"
                max="100"
                data-testid="input-probability"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Stage</label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                data-testid="select-stage"
              >
                {STAGES.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Next Follow-up Date</label>
              <input
                type="date"
                name="nextFollowUpDate"
                value={formData.nextFollowUpDate}
                onChange={handleChange}
                data-testid="input-follow-up-date"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Objection Type</label>
              <select
                name="objectionType"
                value={formData.objectionType}
                onChange={handleChange}
                data-testid="select-objection-type"
              >
                {OBJECTION_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose} data-testid="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" data-testid="submit-lead-btn">
              {lead ? 'Update Lead' : 'Add Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
