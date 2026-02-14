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

  const getObjectionDistribution = () => {
    const data = {};
    leads.forEach(lead => {
      if (lead.objectionType && lead.objectionType !== 'None') {
        data[lead.objectionType] = (data[lead.objectionType] || 0) + 1;
      }
    });
    return data;
  };

  const getHighPotentialSegments = () => {
    const segments = {};
    leads.forEach(lead => {
      if (!segments[lead.serviceType]) {
        segments[lead.serviceType] = { count: 0, totalValue: 0, avgProb: 0, wins: 0 };
      }
      segments[lead.serviceType].count++;
      segments[lead.serviceType].totalValue += lead.estimatedDealValue;
      segments[lead.serviceType].avgProb += lead.probability;
      if (lead.stage === 'Closed Won') segments[lead.serviceType].wins++;
    });
    
    const result = {};
    Object.keys(segments).forEach(key => {
      const s = segments[key];
      const avgValue = s.totalValue / s.count;
      const avgProb = s.avgProb / s.count;
      const winRate = s.count > 0 ? (s.wins / s.count * 100) : 0;
      result[key] = `₹${(avgValue / 100000).toFixed(1)}L | ${avgProb.toFixed(0)}% | ${winRate.toFixed(0)}% win`;
    });
    return result;
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
  const objectionData = getObjectionDistribution();
  const highPotentialData = getHighPotentialSegments();

  return (
    <div className="analytics-section" data-testid="analytics-section">
      <h2>Analytics</h2>
      <div className="analytics-grid">
        {renderBarChart(serviceTypeData, 'Leads per Service Type')}
        {renderBarChart(stageData, 'Stage Distribution')}
        {renderBarChart(valueByService, 'Total Value per Service Type', formatCurrency)}
      </div>
      <div className="analytics-grid" style={{ marginTop: '30px' }}>
        {Object.keys(objectionData).length > 0 && renderBarChart(objectionData, 'Common Sales Blockers (Objections)')}
        {renderBarChart(highPotentialData, 'High-Potential Segments (Avg Value | Prob | Win Rate)', (v) => v)}
      </div>
    </div>
  );
};

export default AnalyticsSection;
