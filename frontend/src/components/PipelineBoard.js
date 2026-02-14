import LeadCard from './LeadCard';

const STAGES = [
  'Prospecting',
  'Contacted',
  'Discovery Done',
  'Proposal Sent',
  'Negotiation',
  'Closed Won',
  'Closed Lost'
];

export const PipelineBoard = ({ leads, onStageChange, onEdit, onDelete }) => {
  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, stage) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    onStageChange(leadId, stage);
  };

  return (
    <div className="pipeline-board" data-testid="pipeline-board">
      {STAGES.map(stage => {
        const stageLeads = leads.filter(lead => lead.stage === stage);
        return (
          <div
            key={stage}
            className="pipeline-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage)}
            data-testid={`stage-column-${stage.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="column-header">
              <h3>{stage}</h3>
              <span className="lead-count">{stageLeads.length}</span>
            </div>
            <div className="column-content">
              {stageLeads.map(lead => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onDragStart={handleDragStart}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PipelineBoard;
