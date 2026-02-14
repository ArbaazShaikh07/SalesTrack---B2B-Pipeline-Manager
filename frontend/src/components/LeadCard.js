export const LeadCard = ({ lead, onDragStart, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
  };

  const formatCurrency = (value) => {
    return `₹${(value / 100000).toFixed(2)}L`;
  };

  const isOverdue = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const followUpDate = new Date(lead.nextFollowUpDate);
    followUpDate.setHours(0, 0, 0, 0);
    return followUpDate < today;
  };

  const getProbabilityClass = () => {
    if (lead.probability < 30) return 'prob-low';
    if (lead.probability <= 70) return 'prob-medium';
    return 'prob-high';
  };

  return (
    <div
      className={`lead-card ${isOverdue() ? 'overdue' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      data-testid={`lead-card-${lead.id}`}
    >
      {isOverdue() && <div className="overdue-tag" data-testid="overdue-tag">Overdue</div>}
      
      <div className="card-header">
        <h4 data-testid="lead-company-name">{lead.companyName}</h4>
        <div className="card-actions">
          <button 
            className="edit-btn" 
            onClick={() => onEdit(lead)}
            data-testid={`edit-lead-${lead.id}`}
          >
            ✎
          </button>
          <button 
            className="delete-btn" 
            onClick={() => onDelete(lead.id)}
            data-testid={`delete-lead-${lead.id}`}
          >
            ×
          </button>
        </div>
      </div>

      <div className="card-detail">
        <span className="service-badge" data-testid="service-type">{lead.serviceType}</span>
        <span className={`probability-badge ${getProbabilityClass()}`} data-testid="probability-badge">
          {lead.probability}%
        </span>
      </div>

      <div className="card-value" data-testid="deal-value">
        {formatCurrency(lead.estimatedDealValue)}
      </div>

      <div className="card-footer" data-testid="follow-up-date">
        Next: {formatDate(lead.nextFollowUpDate)}
      </div>
    </div>
  );
};

export default LeadCard;
