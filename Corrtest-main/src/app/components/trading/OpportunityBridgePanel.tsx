import { Link } from 'react-router';
import { PButton, PCard, PDataTable, PStatusBadge, PToast } from '../polly';

const missedWinRows = [
  {
    loan_id: 'LN-22014',
    seller: 'Northpoint',
    would_win_buyer: 'Anonymous Buyer A',
    reason_blocked: 'Approval missing',
    upside_bps: '+17',
    state: 'warning',
  },
  {
    loan_id: 'LN-22011',
    seller: 'Keystone',
    would_win_buyer: 'Anonymous Buyer B',
    reason_blocked: 'Approval expired',
    upside_bps: '+11',
    state: 'pending',
  },
];

const introLifecycleRows = [
  { candidate: 'Anonymous Buyer A', stage: 'Anonymous candidate', owner: 'AI Agent', eta: 'Today', state: 'active' },
  { candidate: 'Anonymous Buyer B', stage: 'Intro requested', owner: 'Network Ops', eta: 'Today', state: 'pending' },
  { candidate: 'North River (revealed)', stage: 'Intro accepted', owner: 'Capital Markets', eta: 'Tomorrow', state: 'success' },
];

export function OpportunityBridgePanel() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <PCard
        title="Missed-win approval bridge"
        description="Turn non-approved would-win scenarios into approval actions."
      >
        <PDataTable
          variant="compact"
          rowKey={(row) => `${row.loan_id}-${row.would_win_buyer}`}
          rows={missedWinRows}
          columns={[
            { key: 'loan_id', label: 'Loan ID', sortable: true, freeze: true },
            { key: 'seller', label: 'Seller', sortable: true },
            { key: 'would_win_buyer', label: 'Would-win buyer', sortable: true },
            { key: 'reason_blocked', label: 'Blocked by', sortable: true },
            { key: 'upside_bps', label: 'Upside (bps)', sortable: true },
            {
              key: 'state',
              label: 'Status',
              render: (v) => <PStatusBadge status={v === 'warning' ? 'warning' : 'pending'} label={v} />,
            },
          ]}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Link to="/network/approvals">
            <PButton size="sm" intent="primary">
              Initiate approval workflow
            </PButton>
          </Link>
          <PButton
            size="sm"
            variant="outline"
            intent="accent"
            onClick={() => PToast.success('Approval packet prepared for review')}
          >
            Generate approval packet
          </PButton>
        </div>
      </PCard>
      <PCard
        title="Anonymous intro lifecycle"
        description="Move from anonymous discovery to accepted introduction."
      >
        <PDataTable
          variant="compact"
          rowKey={(row) => `${row.candidate}-${row.stage}`}
          rows={introLifecycleRows}
          columns={[
            { key: 'candidate', label: 'Candidate', sortable: true, freeze: true },
            { key: 'stage', label: 'Stage', sortable: true },
            { key: 'owner', label: 'Owner', sortable: true },
            { key: 'eta', label: 'ETA', sortable: true },
            {
              key: 'state',
              label: 'Status',
              render: (v) => <PStatusBadge status={v as any} label={v} />,
            },
          ]}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <PButton size="sm" intent="primary" onClick={() => PToast.success('Intro request submitted')}>
            Request intro
          </PButton>
          <Link to="/network/buyers">
            <PButton size="sm" variant="outline" intent="accent">
              View buyer directory
            </PButton>
          </Link>
        </div>
      </PCard>
    </div>
  );
}
