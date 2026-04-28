import { PButton, PCard, PDataTable, PStatusBadge, PToast } from '../polly';

const handoffRows = [
  {
    condition_id: 'CD-902',
    packet: 'Seller packet v3',
    buyer_agent: 'Doc validation',
    seller_agent: 'Counter-evidence upload',
    thread_state: 'awaiting_seller',
  },
  {
    condition_id: 'CD-894',
    packet: 'Seller packet v2',
    buyer_agent: 'Eligibility reconciliation',
    seller_agent: 'Approval confirmation',
    thread_state: 'ready_to_clear',
  },
];

export function ConditionHandoffPanel() {
  return (
    <PCard
      title="Seller condition packet & agent handoff thread"
      description="Makes buyer-agent and seller-agent collaboration explicit before clearing."
    >
      <PDataTable
        variant="compact"
        rowKey={(row) => row.condition_id}
        rows={handoffRows}
        columns={[
          { key: 'condition_id', label: 'Condition ID', sortable: true, freeze: true },
          { key: 'packet', label: 'Seller packet', sortable: true },
          { key: 'buyer_agent', label: 'Buyer agent task', sortable: true },
          { key: 'seller_agent', label: 'Seller agent task', sortable: true },
          {
            key: 'thread_state',
            label: 'Thread state',
            render: (v) => (
              <PStatusBadge
                status={v === 'ready_to_clear' ? 'success' : 'pending'}
                label={v === 'ready_to_clear' ? 'ready to clear' : 'awaiting seller'}
              />
            ),
          },
        ]}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <PButton size="sm" intent="primary" onClick={() => PToast.success('Condition packet sent to seller')}>
          Send condition packet
        </PButton>
        <PButton size="sm" variant="outline" intent="accent" onClick={() => PToast.info('Agent handoff thread opened')}>
          Open agent handoff thread
        </PButton>
      </div>
    </PCard>
  );
}
