export const DashboardSummary = ({ leads }) => {
  const totalLeads = leads.length;
  const totalPipelineValue = leads.reduce((sum, lead) => sum + lead.estimatedDealValue, 0);
  const weightedForecast = leads.reduce((sum, lead) => 
    sum + (lead.estimatedDealValue * lead.probability / 100), 0
  );
  const closedWon = leads.filter(l => l.stage === 'Closed Won').length;
  const conversionRate = totalLeads > 0 ? ((closedWon / totalLeads) * 100).toFixed(1) : 0;

  const formatCurrency = (value) => {
    return `₹${(value / 100000).toFixed(2)}L`;
  };

  return (
    <div className="dashboard-summary" data-testid="dashboard-summary">
      <div className="summary-card">
        <div className="summary-label">Total Leads</div>
        <div className="summary-value" data-testid="total-leads">{totalLeads}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">Pipeline Value</div>
        <div className="summary-value" data-testid="pipeline-value">{formatCurrency(totalPipelineValue)}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">Weighted Forecast</div>
        <div className="summary-value" data-testid="weighted-forecast">{formatCurrency(weightedForecast)}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">Conversion Rate</div>
        <div className="summary-value" data-testid="conversion-rate">{conversionRate}%</div>
      </div>
    </div>
  );
};

export default DashboardSummary;
