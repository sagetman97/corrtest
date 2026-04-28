import { StatCard } from '../components/StatCard';
import { Icon } from '../components/Icon';
import { PageHeader } from '../components/PageHeader';

const contacts = [
  {
    type: 'Customer Success Manager',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@polly.io',
    phone: '+1 (555) 234-5678',
  },
  {
    type: 'Technical Support',
    name: 'Support Team',
    email: 'support@polly.io',
    phone: '+1 (555) 234-5679',
  },
  {
    type: 'Implementation Lead',
    name: 'Jordan Kim',
    email: 'jordan.kim@polly.io',
    phone: '+1 (555) 234-5680',
  },
];

const resources = [
  { title: 'Product & Pricing Engine Documentation', url: '#', category: 'Documentation' },
  { title: 'Loan Trading Best Practices', url: '#', category: 'Guides' },
  { title: 'API Integration Guide', url: '#', category: 'Technical' },
  { title: 'User Management & Permissions', url: '#', category: 'Administration' },
  { title: 'Best Execution Strategy Guide', url: '#', category: 'Guides' },
  { title: 'Release Notes - April 2026', url: '#', category: 'Updates' },
];

const milestones = [
  { phase: 'Initial Setup', status: 'completed', date: '2025-11-15', description: 'Platform provisioning and access configuration' },
  { phase: 'Data Integration', status: 'completed', date: '2025-12-08', description: 'LOS and agency integrations established' },
  { phase: 'Pricing Configuration', status: 'completed', date: '2026-01-22', description: 'Product and pricing rules configured' },
  { phase: 'User Training', status: 'completed', date: '2026-02-14', description: 'Team onboarding and certification' },
  { phase: 'Production Launch', status: 'completed', date: '2026-03-01', description: 'Live production environment activated' },
  { phase: 'Ongoing Optimization', status: 'active', date: 'Current', description: 'Continuous improvement and support' },
];

export function Support() {
  return (
    <div className="p-4">
      <PageHeader
        title="Support & Success"
        subtitle="Customer Success Team | Business hours: Mon-Fri 8AM-6PM EST"
      />

      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <StatCard
          title="Support Tickets"
          value="2"
          change="Last 30 days"
          changeType="neutral"
          icon="support"
        />
        <StatCard
          title="Avg Response Time"
          value="1.2 hrs"
          change="Last 30 days"
          changeType="positive"
          icon="circle-check"
        />
        <StatCard
          title="Implementation Progress"
          value="100%"
          subtitle="All phases complete"
          icon="circle-check"
        />
        <StatCard
          title="Available Resources"
          value="47"
          subtitle="Documentation & guides"
          icon="file-text"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-card border border-border p-5"
          style={{ borderRadius: 'var(--radius-base)', boxShadow: 'var(--shadow-m)' }}>
          <h2 className="mb-4 text-sm">Your Polly Team</h2>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.type} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="text-sm text-muted-foreground mb-1">{contact.type}</div>
                <div className="font-medium mb-2">{contact.name}</div>
                <div className="text-sm text-muted-foreground mb-1">
                  <a href={`mailto:${contact.email}`} className="hover:text-foreground">{contact.email}</a>
                </div>
                <div className="text-sm text-muted-foreground">{contact.phone}</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-3 py-2 bg-primary text-primary-foreground text-sm hover:bg-primary/90">
            Create Support Ticket
          </button>
        </div>

        <div className="bg-card border border-border p-5"
          style={{ borderRadius: 'var(--radius-base)', boxShadow: 'var(--shadow-m)' }}>
          <h2 className="mb-4 text-sm">Quick Links</h2>
          <div className="space-y-2">
            {resources.map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div>
                  <div className="text-sm font-medium">{resource.title}</div>
                  <div className="text-xs text-muted-foreground">{resource.category}</div>
                </div>
                <Icon name="file-text" size={16} className="text-muted-foreground" />
              </a>
            ))}
          </div>
          <button
            className="w-full mt-4 px-3 py-2 border border-border text-sm hover:bg-muted/30"
            style={{ borderRadius: 'var(--radius-xl)' }}
          >
            Browse All Documentation
          </button>
        </div>
      </div>

      <div className="bg-card border border-border p-5"
          style={{ borderRadius: 'var(--radius-base)', boxShadow: 'var(--shadow-m)' }}>
        <h2 className="mb-4 text-sm">Implementation Timeline</h2>
        <div className="space-y-4">
          {milestones.map((milestone, idx) => (
            <div key={milestone.phase} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-[#e8f5ef]' : 'bg-[#e7ecfc]'
                }`}>
                  {milestone.status === 'completed' ? (
                    <Icon name="circle-check" size={18} className="text-[#6fcf97]" />
                  ) : (
                    <div className="w-3 h-3 bg-[#1c67fe] rounded-full"></div>
                  )}
                </div>
                {idx < milestones.length - 1 && (
                  <div className="w-0.5 h-12 bg-border mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm">{milestone.phase}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-sm ${
                    milestone.status === 'completed'
                      ? 'bg-[#e8f5ef] text-[#27ae60]'
                      : 'bg-[#e7ecfc] text-[#1c67fe]'
                  }`}>
                    {milestone.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mb-1">{milestone.description}</div>
                <div className="text-xs text-muted-foreground">{milestone.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
