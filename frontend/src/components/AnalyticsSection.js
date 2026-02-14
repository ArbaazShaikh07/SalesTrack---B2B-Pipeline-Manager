export const AnalyticsSection = ({ leads }) => {
  const getServiceTypeData = () => {
    const data = {};
    leads.forEach(lead => {
      data[lead.serviceType] = (data[lead.serviceType] || 0) + 1;
    });
    return data;
  };

  const getStageDistribution = () => {
    const data = {};
    leads.forEach(lead => {
      data[lead.stage] = (data[lead.stage] || 0) + 1;
    });
    return data;
  };

  const getValueByService = () => {
    const data = {};
    leads.forEach(lead => {
      data[lead.serviceType] = (data[lead.serviceType] || 0) + lead.estimatedDealValue;
    });
    return data;
  };

  const renderBarChart = (data, title, valueFormatter = (v) => v) => {
    const maxValue = Math.max(...Object.values(data));
    
    return (
      <div className="chart-container">
        <h3>{title}</h3>
        <div className="bar-chart">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="bar-item">
              <div className="bar-label">{key}</div>
              <div className="bar-wrapper">
                <div 
                  className="bar-fill"
                  style={{ width: `${(value / maxValue) * 100}%` }}
                  data-testid={`bar-${key.toLowerCase().replace(/\s+/g, '-')}`}
                ></div>
                <span className="bar-value">{valueFormatter(value)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const formatCurrency = (value) => {
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  const serviceTypeData = getServiceTypeData();
  const stageData = getStageDistribution();
  const valueByService = getValueByService();

  return (
    <div className="analytics-section" data-testid="analytics-section">
      <h2>Analytics</h2>
      <div className="analytics-grid">
        {renderBarChart(serviceTypeData, 'Leads per Service Type')}
        {renderBarChart(stageData, 'Stage Distribution')}
        {renderBarChart(valueByService, 'Total Value per Service Type', formatCurrency)}
      </div>
    </div>
  );
};

export default AnalyticsSection;
