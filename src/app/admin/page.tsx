'use client';

import { useEffect, useState } from 'react';
import {
  Grid,
  Column,
  Tile,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Tag,
  Modal,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  SelectItem,
  InlineNotification,
} from '@carbon/react';
import { Add, Edit, View } from '@carbon/icons-react';
import { Header } from '@/components/Header';
import { mockCampaigns } from '@/lib/mock-data';
import type { Campaign, FounderApplication } from '@/types/database';
import { createClient } from '@/lib/supabase/client';

// Mock founder applications
const mockApplications: FounderApplication[] = [
  {
    id: '1',
    company_name: 'TechStartup Inc',
    website: 'https://techstartup.com',
    contact_name: 'John Doe',
    contact_email: 'john@techstartup.com',
    stage: 'seed',
    description: 'AI-powered productivity tools for remote teams',
    desired_crowd_raise: 100000,
    status: 'new',
    created_at: '2024-02-20T00:00:00Z',
    updated_at: '2024-02-20T00:00:00Z',
  },
  {
    id: '2',
    company_name: 'GreenEnergy Co',
    website: 'https://greenenergy.co',
    contact_name: 'Jane Smith',
    contact_email: 'jane@greenenergy.co',
    stage: 'pre-seed',
    description: 'Sustainable energy solutions for small businesses',
    desired_crowd_raise: 75000,
    status: 'in_review',
    created_at: '2024-02-18T00:00:00Z',
    updated_at: '2024-02-19T00:00:00Z',
  },
];

export default function AdminPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [applications, setApplications] = useState<FounderApplication[]>(mockApplications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [metrics, setMetrics] = useState({
    volume: 0,
    activeInvestors: 0,
    conversion: 0,
    totalInvestors: 0,
  });
  const [metricsError, setMetricsError] = useState<string | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);

  // Campaign form state
  const [formData, setFormData] = useState({
    company_name: '',
    tagline: '',
    description: '',
    founder_name: '',
    min_investment: 50,
    max_investment_per_person: 1000,
    target_amount: 100000,
    crowd_percentage: 5,
    status: 'draft' as Campaign['status'],
  });

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      company_name: campaign.company_name,
      tagline: campaign.tagline,
      description: campaign.description,
      founder_name: campaign.founder_name,
      min_investment: campaign.min_investment,
      max_investment_per_person: campaign.max_investment_per_person,
      target_amount: campaign.target_amount,
      crowd_percentage: campaign.crowd_percentage,
      status: campaign.status,
    });
    setIsModalOpen(true);
  };

  const handleSaveCampaign = () => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === editingCampaign.id 
          ? { ...c, ...formData, updated_at: new Date().toISOString() }
          : c
      ));
    } else {
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        ...formData,
        logo_url: undefined,
        cover_image_url: undefined,
        media_urls: [],
        founder_bio: '',
        amount_raised: 0,
        slug: formData.company_name.toLowerCase().replace(/\s+/g, '-'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setCampaigns([...campaigns, newCampaign]);
    }
    setIsModalOpen(false);
    setEditingCampaign(null);
  };

  useEffect(() => {
    const supabase = createClient();

    const fetchMetrics = async () => {
      setMetricsLoading(true);
      setMetricsError(null);

      const [{ data: investments, error: investmentError }, userCountResponse] = await Promise.all([
        supabase.from('investment_intents').select('amount, status, user_id'),
        supabase.from('users').select('id', { count: 'exact', head: true }),
      ]);

      if (investmentError || userCountResponse.error) {
        setMetricsError(investmentError?.message || userCountResponse.error?.message || 'Unable to load metrics');
        setMetricsLoading(false);
        return;
      }

      const confirmedInvestments = (investments || []).filter((inv) => inv.status === 'confirmed');
      const volume = confirmedInvestments.reduce((sum, inv) => sum + inv.amount, 0);
      const activeInvestors = new Set(confirmedInvestments.map((inv) => inv.user_id)).size;
      const totalInvestors = userCountResponse.count || 0;
      const conversion = totalInvestors > 0 ? (activeInvestors / totalInvestors) * 100 : 0;

      setMetrics({ volume, activeInvestors, conversion, totalInvestors });
      setMetricsLoading(false);
    };

    fetchMetrics();
  }, []);

  const handleUpdateApplicationStatus = (id: string, status: FounderApplication['status']) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status, updated_at: new Date().toISOString() } : app
    ));
  };

  const campaignHeaders = [
    { key: 'company_name', header: 'Company' },
    { key: 'status', header: 'Status' },
    { key: 'target_amount', header: 'Target' },
    { key: 'amount_raised', header: 'Raised' },
    { key: 'actions', header: 'Actions' },
  ];

  const applicationHeaders = [
    { key: 'company_name', header: 'Company' },
    { key: 'contact_name', header: 'Contact' },
    { key: 'stage', header: 'Stage' },
    { key: 'desired_crowd_raise', header: 'Desired Raise' },
    { key: 'status', header: 'Status' },
    { key: 'actions', header: 'Actions' },
  ];

  const statusKind = {
    draft: 'warm-gray',
    live: 'green',
    paused: 'blue',
    closed: 'cool-gray',
    new: 'purple',
    in_review: 'blue',
    approved: 'green',
    rejected: 'red',
  } as const;

  return (
    <>
      <Header />
      <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)', background: '#f4f4f4' }}>
        <div className="container" style={{ padding: '2rem 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 300 }}>Admin Console</h1>
          </div>

          <Tabs>
            <TabList aria-label="Admin tabs">
              <Tab>Campaigns</Tab>
              <Tab>Applications</Tab>
              <Tab>Metrics</Tab>
            </TabList>
            <TabPanels>
              {/* Campaigns Tab */}
              <TabPanel>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    kind="primary"
                    renderIcon={Add}
                    onClick={() => {
                      setEditingCampaign(null);
                      setFormData({
                        company_name: '',
                        tagline: '',
                        description: '',
                        founder_name: '',
                        min_investment: 50,
                        max_investment_per_person: 1000,
                        target_amount: 100000,
                        crowd_percentage: 5,
                        status: 'draft',
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    New Campaign
                  </Button>
                </div>
                <DataTable rows={campaigns.map(c => ({ ...c, id: c.id }))} headers={campaignHeaders}>
                  {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })} key={header.key}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => {
                          const campaign = campaigns.find(c => c.id === row.id)!;
                          return (
                            <TableRow {...getRowProps({ row })} key={row.id}>
                              <TableCell>{campaign.company_name}</TableCell>
                              <TableCell>
                                <Tag type={statusKind[campaign.status]} size="sm">
                                  {campaign.status}
                                </Tag>
                              </TableCell>
                              <TableCell>${campaign.target_amount.toLocaleString()}</TableCell>
                              <TableCell>${campaign.amount_raised.toLocaleString()}</TableCell>
                              <TableCell>
                                <Button
                                  kind="ghost"
                                  size="sm"
                                  renderIcon={Edit}
                                  iconDescription="Edit"
                                  hasIconOnly
                                  onClick={() => handleEditCampaign(campaign)}
                                />
                                <Button
                                  kind="ghost"
                                  size="sm"
                                  renderIcon={View}
                                  iconDescription="View"
                                  hasIconOnly
                                  onClick={() => window.open(`/campaigns/${campaign.slug}`, '_blank')}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </DataTable>
              </TabPanel>

              {/* Applications Tab */}
              <TabPanel>
                <DataTable rows={applications.map(a => ({ ...a, id: a.id }))} headers={applicationHeaders}>
                  {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })} key={header.key}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => {
                          const app = applications.find(a => a.id === row.id)!;
                          return (
                            <TableRow {...getRowProps({ row })} key={row.id}>
                              <TableCell>{app.company_name}</TableCell>
                              <TableCell>
                                <div>
                                  <div>{app.contact_name}</div>
                                  <div style={{ fontSize: '0.75rem', color: '#525252' }}>{app.contact_email}</div>
                                </div>
                              </TableCell>
                              <TableCell>{app.stage}</TableCell>
                              <TableCell>${app.desired_crowd_raise.toLocaleString()}</TableCell>
                              <TableCell>
                                <Tag type={statusKind[app.status]} size="sm">
                                  {app.status.replace('_', ' ')}
                                </Tag>
                              </TableCell>
                              <TableCell>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  {app.status === 'new' && (
                                    <Button
                                      kind="ghost"
                                      size="sm"
                                      onClick={() => handleUpdateApplicationStatus(app.id, 'in_review')}
                                    >
                                      Review
                                    </Button>
                                  )}
                                  {app.status === 'in_review' && (
                                    <>
                                      <Button
                                        kind="primary"
                                        size="sm"
                                        onClick={() => handleUpdateApplicationStatus(app.id, 'approved')}
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        kind="danger"
                                        size="sm"
                                        onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')}
                                      >
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </DataTable>
              </TabPanel>

              {/* Metrics Tab */}
              <TabPanel>
                {metricsError && (
                  <div style={{ marginBottom: '1rem' }}>
                    <InlineNotification
                      kind="error"
                      title="Unable to load platform metrics"
                      subtitle={metricsError}
                      onClose={() => setMetricsError(null)}
                    />
                  </div>
                )}

                <Grid>
                  <Column lg={4} md={4} sm={4}>
                    <Tile style={{ textAlign: 'center', padding: '2rem' }}>
                      <p style={{ color: '#525252', marginBottom: '0.5rem' }}>Platform volume</p>
                      <p style={{ fontSize: '3rem', fontWeight: 600 }}>
                        {metricsLoading ? '—' : `$${metrics.volume.toLocaleString()}`}
                      </p>
                      <p style={{ color: '#525252' }}>Confirmed investments processed</p>
                    </Tile>
                  </Column>
                  <Column lg={4} md={4} sm={4}>
                    <Tile style={{ textAlign: 'center', padding: '2rem' }}>
                      <p style={{ color: '#525252', marginBottom: '0.5rem' }}>Active investors</p>
                      <p style={{ fontSize: '3rem', fontWeight: 600 }}>
                        {metricsLoading ? '—' : metrics.activeInvestors}
                      </p>
                      <p style={{ color: '#525252' }}>Investors with confirmed positions</p>
                    </Tile>
                  </Column>
                  <Column lg={4} md={4} sm={4}>
                    <Tile style={{ textAlign: 'center', padding: '2rem' }}>
                      <p style={{ color: '#525252', marginBottom: '0.5rem' }}>Conversion</p>
                      <p style={{ fontSize: '3rem', fontWeight: 600 }}>
                        {metricsLoading ? '—' : `${metrics.conversion.toFixed(1)}%`}
                      </p>
                      <p style={{ color: '#525252' }}>
                        {metricsLoading
                          ? '—'
                          : `${metrics.activeInvestors.toLocaleString()} of ${metrics.totalInvestors.toLocaleString()} investors engaged`}
                      </p>
                    </Tile>
                  </Column>
                  <Column lg={4} md={4} sm={4}>
                    <Tile style={{ textAlign: 'center', padding: '2rem' }}>
                      <p style={{ color: '#525252', marginBottom: '0.5rem' }}>Pending Applications</p>
                      <p style={{ fontSize: '3rem', fontWeight: 600 }}>
                        {applications.filter(a => a.status === 'new' || a.status === 'in_review').length}
                      </p>
                    </Tile>
                  </Column>
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>

        {/* Campaign Modal */}
        <Modal
          open={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onRequestSubmit={handleSaveCampaign}
          modalHeading={editingCampaign ? 'Edit Campaign' : 'New Campaign'}
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextInput
              id="company_name"
              labelText="Company Name"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            />
            <TextInput
              id="tagline"
              labelText="Tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            />
            <TextArea
              id="description"
              labelText="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextInput
              id="founder_name"
              labelText="Founder Name"
              value={formData.founder_name}
              onChange={(e) => setFormData({ ...formData, founder_name: e.target.value })}
            />
            <NumberInput
              id="min_investment"
              label="Min Investment ($)"
              value={formData.min_investment}
              onChange={(_, { value }) => setFormData({ ...formData, min_investment: Number(value) })}
            />
            <NumberInput
              id="max_investment"
              label="Max Investment Per Person ($)"
              value={formData.max_investment_per_person}
              onChange={(_, { value }) => setFormData({ ...formData, max_investment_per_person: Number(value) })}
            />
            <NumberInput
              id="target_amount"
              label="Target Amount ($)"
              value={formData.target_amount}
              onChange={(_, { value }) => setFormData({ ...formData, target_amount: Number(value) })}
            />
            <NumberInput
              id="crowd_percentage"
              label="Crowd Percentage (%)"
              value={formData.crowd_percentage}
              onChange={(_, { value }) => setFormData({ ...formData, crowd_percentage: Number(value) })}
            />
            <Select
              id="status"
              labelText="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Campaign['status'] })}
            >
              <SelectItem value="draft" text="Draft" />
              <SelectItem value="live" text="Live" />
              <SelectItem value="paused" text="Paused" />
              <SelectItem value="closed" text="Closed" />
            </Select>
          </div>
        </Modal>
      </main>
    </>
  );
}
