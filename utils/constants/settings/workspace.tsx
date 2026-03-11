export const ROLES = {
  VA: 'VA',
  EDITOR: 'EDITOR',
  OWNER: 'OWNER',
  CUSTOM: 'CUSTOM',
}

export const MY_WORKSPACE = { label: 'My Workspace', value: undefined }

export const WORKSPACE_SORT_OPTIONS = [
  { label: 'Sort A-Z', value: 'A-Z' },
  { label: 'Sort Z-A', value: 'Z-A' },
  { label: 'Recently Added', value: 'recent' },
]

export const PERMISSIONS = {
  LEAD_FINDER: {
    VIEW: 'leadFinderView',
    REVEAL: 'leadFinderReveal',
    EXPORT: 'leadFinderExport',
  },
  EMAIL_ACCOUNTS: {
    VIEW: 'emailAccountsView',
    CONNECT: 'emailAccountsConnect',
    PAUSE: 'emailAccountsPause',
    SETTINGS: 'emailAccountsSettings',
    IMAP_SMTP: 'emailAccountsImapSmtp',
    STATS: 'emailAccountsStats',
    REMOVE: 'emailAccountsRemove',
    EXPORT: 'emailAccountsExport',
  },
  CAMPAIGNS: {
    VIEW: 'campaignsView',
    EDIT: 'campaignsEdit',
    LAUNCH: 'campaignsLaunch',
    ARCHIVE: 'campaignsArchive',
    MOVE: 'campaignsMove',
    MANAGE_LEADS: 'campaignsManageLeads',
  },
  LEAD_LISTS: {
    VIEW: 'leadListView',
    UPLOAD: 'leadListUpload',
    EDIT: 'leadListEdit',
    DELETE: 'leadListDelete',
    EXPORT: 'leadListExport',
    AI_ENRICHMENT: 'leadListAiEnrichment',
  },
  ONEBOX: {
    PRIMARY_TAB_VIEW: 'oneboxPrimaryView',
    OTHERS_TAB_VIEW: 'oneboxOthersView',
    UPDATE_STATUS: 'oneboxUpdateLeadStatus',
    REPLY: 'oneboxReply',
    AI_REPLY: 'oneboxAiReply',
    CUSTOM_LABELS: 'oneboxCustomLabels',
    ARCHIVE: 'oneboxArchive',
    DELETE_EMAIL: 'oneboxDeleteEmail',
  },
  ANALYTICS: {
    VIEW: 'analyticsView',
  },
  WEBSITE_VISITORS: {
    VIEW: 'visitorsView',
    PIXEL: 'visitorsPixel',
    FIND_EMAILS: 'visitorsFindEmails',
    EXPORT: 'visitorsExport',
    MANAGE_VIEWS: 'visitorsViewsManage',
    NOTIFICATIONS: 'visitorsNotifications',
    AUTOMATE: 'visitorsAutomate',
  },
  SETTINGS: {
    VIEW: 'settingsView',
    EDIT: 'settingsEdit',
    INTEGRATIONS: 'settingsIntegrations',
    PREFERENCES: 'settingsPreferences',
    TEMPLATES: 'settingsTemplates',
    BLOCKLIST: 'settingsBlocklist',
  },
  INBOX_PLACEMENT: {
    VIEW: 'inboxPlacementView',
    RUN: 'inboxPlacementLaunch',
    EXPORT: 'inboxPlacementExport',
  },
}

export const LEAD_FINDER_PERMISSIONS = [
  {
    name: 'leadFinderView',
    label: 'View/Use Filters',
    description:
      'Grants permission to apply filters or search within the Lead Finder for more targeted results.',
  },
  {
    name: 'leadFinderReveal',
    label: 'Reveal Leads Contact info',
    description:
      'Allows the user to see contact info for leads found through the Lead Finder',
  },
  {
    name: 'leadFinderExport',
    label: 'Export Leads',
    description:
      'Lets the user export selected leads to campaigns, lead lists or download as a CSV file.',
  },
]

export const EMAIL_ACCOUNT_PERMISSIONS = [
  {
    name: 'emailAccountsView',
    label: 'View Connected Accounts',
    description:
      'Allows the user to see all connected email accounts and their current status.',
  },
  {
    name: 'emailAccountsConnect',
    label: 'Connect New Account',
    description:
      'Lets the user add new email accounts to ReachInbox for sending',
  },
  {
    name: 'emailAccountsSettings',
    label: 'Manage Warmup and Mailbox Settings',
    description:
      'Grants ability to adjust warmup and deliverability settings and mailbox settings like name, daily limits per account.',
  },
  {
    name: 'emailAccountsImapSmtp',
    label: 'Manage IMAP/SMTP Settings',
    description:
      'Lets users see and manage IMAP and SMTP details if applicable',
  },
  {
    name: 'emailAccountsStats',
    label: 'View Campaign Stats',
    description:
      'Enables the user to view campaign analytics and stats per connected account.',
  },
  {
    name: 'emailAccountsRemove',
    label: 'Remove Account',
    description:
      'Allows the user to disconnect an existing email account from the platform.',
  },
  {
    name: 'emailAccountsExport',
    label: 'Export Email Accounts',
    description: 'Allows users to export all email accounts in a CSV',
  },
]

export const CAMPAIGN_PERMISSIONS = [
  {
    name: 'campaignsView',
    label: 'View Campaigns',
    description: 'Lets the user see all campaigns, sequences, and analytics.',
  },
  {
    name: 'campaignsEdit',
    label: 'Create/Edit Campaigns',
    description:
      'Allows the user to set up new email campaigns from scratch or edit existing ones.',
  },
  {
    name: 'campaignsLaunch',
    label: 'Launch / Pause / Resume Campaigns',
    description:
      'Allows the user to start, pause, or resume ongoing campaigns.',
  },
  {
    name: 'campaignsArchive',
    label: 'Archive / Delete Campaigns',
    description:
      'Lets the user archive old campaigns or permanently remove them.',
  },
  {
    name: 'campaignsMove',
    label: 'Move Campaigns',
    description:
      'Lets the user archive old campaigns or permanently remove them.',
  },
  {
    name: 'campaignsManageLeads',
    label: 'Manage Leads in Campaign',
    description:
      'Allows the user to see, add, remove, or update leads within a campaign.',
  },
]

export const LEAD_LIST_PERMISSIONS = [
  {
    name: 'leadListView',
    label: 'View Lead Lists',
    description: 'Allows the user to access lead lists.',
  },
  {
    name: 'leadListUpload',
    label: 'Upload Leads',
    description:
      'Lets the user add new leads to any list via upload or manual entry.',
  },
  {
    name: 'leadListEdit',
    label: 'Create/Upload/Update Leads',
    description:
      'Lets the user add new leads to any list via upload or manual entry.',
  },
  {
    name: 'leadListDelete',
    label: 'Delete Lead Lists',
    description: 'Let the user delete a lead list.',
  },
  {
    name: 'leadListExport',
    label: 'Export Lead Lists',
    description:
      'Grants ability to export lead lists to campaign, CSV, or other sections.',
  },
  {
    name: 'leadListAiEnrichment',
    label: 'Run AI Enrichment',
    description:
      'Enables the user to run AI-powered enrichment or data enhancement on leads.',
  },
]

export const ONEBOX_PERMISSIONS = [
  {
    name: 'oneboxPrimaryView',
    label: 'Allow Primary Tab View',
    description: 'Allows the user to go through the primary tab of the Onebox.',
  },
  {
    name: 'oneboxOthersView',
    label: 'Allow Others Tab View',
    description: 'Allows the user to go through the others tab of the Onebox.',
  },
  {
    name: 'oneboxUpdateLeadStatus',
    label: 'Update Lead Status Manually',
    description:
      'Lets the user manually update the status of a lead in Onebox.',
  },
  {
    name: 'oneboxReply',
    label: 'Reply to Leads',
    description:
      'Allows the user to send replies to leads directly from Onebox and assign a replacement email if required.',
  },
  {
    name: 'oneboxAiReply',
    label: 'Use AI Replies',
    description:
      'Let users generate replies using AI. Will consume AI Credits.',
  },
  {
    name: 'oneboxCustomLabels',
    label: 'Create Custom AI Labels',
    description:
      'Allow users to create custom labels. Will consume AI Credits if AI Tagging is enabled.',
  },
  {
    name: 'oneboxArchive',
    label: 'Archive Conversations',
    description:
      'Enables the user to archive or remove conversations from view.',
  },
  {
    name: 'oneboxDeleteEmail',
    label: 'Delete Email',
    description: 'Allows users to delete emails permanently.',
  },
]

export const analyticsPermissions = [
  {
    name: 'analyticsView',
    label: 'View Analytics',
    description:
      'Allows access to the global analytics section to see campaign and performance data.',
  },
]

export const WEBSITE_VISITORS_PERMISSIONS = [
  {
    name: 'visitorsView',
    label: 'View Website Visitors',
    description:
      'Lets the user see all site visitors identified by the installed pixel.',
  },
  {
    name: 'visitorsPixel',
    label: 'Setup Website Pixel',
    description:
      'Allows the user to integrate, configure, or remove the website tracking pixel.',
  },
  {
    name: 'visitorsFindEmails',
    label: 'Find Visitor Emails',
    description: 'Enables the user to look up, find, and add visitor emails.',
  },
  {
    name: 'visitorsExport',
    label: 'Export Visitors',
    description:
      'Lets the user export visitors to campaigns, lead lists, CSV, or integrations.',
  },
  {
    name: 'visitorsViewsManage',
    label: 'Create and Manage Views',
    description:
      'Allows creation, updating, or deletion of custom filters (views) for sorting visitors.',
  },
  {
    name: 'visitorsNotifications',
    label: 'Setup Notifications',
    description:
      'Grants ability to set up Slack notifications or webhook triggers for specific visitor actions.',
  },
  {
    name: 'visitorsAutomate',
    label: 'Automate Actions',
    description:
      'Allows configuration of automated workflows, e.g., sending visitors directly to campaigns or integrations.',
  },
]

export const SETTINGS_PERMISSIONS = [
  {
    name: 'settingsView',
    label: 'View Account Settings',
    description:
      'Grants access to general account details like name, email, and password.',
  },
  {
    name: 'settingsEdit',
    label: 'Edit Account Settings',
    description: 'Allows the user to update profile or account information.',
  },
  {
    name: 'settingsIntegrations',
    label: 'Manage Integrations',
    description:
      'Lets the user add, edit, or remove integrations such as APIs or webhooks.',
  },
  {
    name: 'settingsPreferences',
    label: 'Edit Preferences',
    description:
      'Allows the user to adjust general platform preferences for the workspace.',
  },
  {
    name: 'settingsTemplates',
    label: 'Edit Email Templates',
    description:
      'Grants permission to create, update, or remove email templates.',
  },
  {
    name: 'settingsBlocklist',
    label: 'Manage Blocklist',
    description:
      'Allows editing or updating the blocklist for emails and domains.',
  },
]

export const INBOX_PLACEMENT_PERMISSIONS = [
  {
    name: 'inboxPlacementView',
    label: 'View Inbox placement test',
    description:
      'Allows the user to see all inbox placement tests and their results.',
  },
  {
    name: 'inboxPlacementLaunch',
    label: 'Launch a new test',
    description:
      'Allows the user to create, edit, and run inbox placement tests.',
  },
  {
    name: 'inboxPlacementExport',
    label: 'Export test results',
    description: 'Allows the user to export inbox placement test results.',
  },
]
