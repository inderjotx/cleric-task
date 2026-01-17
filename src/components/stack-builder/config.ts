import slackLogo from '@/assets/stack/logos/Slack.svg';
import datadogLogo from '@/assets/stack/logos/Datadog.svg';
import teamsLogo from '@/assets/stack/logos/teams.svg';
import lokiLogo from '@/assets/stack/logos/loki.svg';
import elasticsearchLogo from '@/assets/stack/logos/elasticsearch.svg';
import gcpLogo from '@/assets/stack/logos/gcp.svg';
import splunkLogo from '@/assets/stack/logos/splunk.svg';
import kubernetesLogo from '@/assets/stack/logos/kubernetes.svg';
import awsLogo from '@/assets/stack/logos/aws.svg';
import azureLogo from '@/assets/stack/logos/azure.svg';
import githubLogo from '@/assets/stack/logos/github.svg';
import gitlabLogo from '@/assets/stack/logos/gitlab.svg';
import prometheusLogo from '@/assets/stack/logos/prometheus.png';


export const CATEGORY_IDS = {
    COMMUNICATION: 'communication',
    LOGS: 'logs',
    INFRASTRUCTURE: 'infrastructure',
    SOURCE_CODE: 'source-code',
    METRICS: 'metrics',
} as const;

export const OPTION_IDS = {
    // Communication
    SLACK: 'slack',
    TEAMS: 'teams',
    // Logs
    DATADOG_LOGS: 'datadog-logs',
    LOKI: 'loki',
    ELASTICSEARCH: 'elasticsearch',
    CLOUDWATCH_LOGS: 'cloudwatch-logs',
    GCP_LOGGING: 'gcp-logging',
    SPLUNK: 'splunk',
    // Infrastructure
    KUBERNETES: 'kubernetes',
    AWS: 'aws',
    ECS: 'ecs',
    AZURE: 'azure',
    GCP: 'gcp',
    // Source Code
    GITHUB: 'github',
    GITLAB: 'gitlab',
    // Metrics
    PROMETHEUS: 'prometheus',
    DATADOG_METRICS: 'datadog-metrics',
    CLOUDWATCH_METRICS: 'cloudwatch-metrics',
    GCP_METRICS: 'gcp-metrics',
} as const;

export type CategoryId = typeof CATEGORY_IDS[keyof typeof CATEGORY_IDS];
export type OptionId = typeof OPTION_IDS[keyof typeof OPTION_IDS];

// ============================================================================
// Interfaces
// ============================================================================

export interface Option {
    id: OptionId;
    label: string;
    comingSoon?: boolean;
    subOptions?: Option[];
    image: string;
}

export interface Category {
    id: CategoryId;
    label: string;
    required?: boolean;
    multiSelect?: boolean;
    options: Option[];
}

export interface FeedbackItem {
    id: string;
    title: string;
    description: string;
    triggerCategories: CategoryId[];
}

export type AssessmentIcon = 'empty' | 'warning' | 'check' | 'complete';

export interface AssessmentLevel {
    min: number;
    max: number;
    title: string;
    description: string;
    fitText: string;
    fitDescription: string;
    icon: AssessmentIcon;
    ready: boolean;
}

export const ASSESSMENT_LEVELS: AssessmentLevel[] = [
    {
        min: 0,
        max: 0,
        title: 'Select your stack',
        description: 'Select options to see coverage',
        fitText: '',
        fitDescription: '',
        icon: 'empty',
        ready: false,
    },
    {
        min: 1,
        max: 1,
        title: 'Insufficient stack coverage',
        description: 'Requires logs or metrics integration',
        fitText: 'Poor fit | 1/5 enabled',
        fitDescription: 'Requires logs or metrics integration',
        icon: 'warning',
        ready: false,
    },
    {
        min: 2,
        max: 2,
        title: 'Basic coverage',
        description: '2/5 capabilities enabled',
        fitText: 'Minimal fit | 2/5 enabled',
        fitDescription: 'Ready to continue',
        icon: 'warning',
        ready: true,
    },
    {
        min: 3,
        max: 3,
        title: 'Good coverage',
        description: '3/5 capabilities enabled',
        fitText: 'Good fit | 3/5 enabled',
        fitDescription: 'Ready for comprehensive investigations',
        icon: 'check',
        ready: true,
    },
    {
        min: 4,
        max: 4,
        title: 'Good coverage',
        description: '4/5 capabilities enabled',
        fitText: 'Good fit | 4/5 enabled',
        fitDescription: 'Ready for comprehensive investigations',
        icon: 'check',
        ready: true,
    },
    {
        min: 5,
        max: 5,
        title: 'Complete coverage',
        description: '5/5 capabilities enabled',
        fitText: 'Excellent fit | 5/5 enabled',
        fitDescription: 'e2e investigations ready',
        icon: 'complete',
        ready: true,
    },
];

// ============================================================================
// Stack Configuration
// ============================================================================

export const STACK_CONFIG: Category[] = [
    {
        id: CATEGORY_IDS.COMMUNICATION,
        label: 'Communication',
        required: true,
        multiSelect: false,
        options: [
            { id: OPTION_IDS.SLACK, label: 'Slack', image: slackLogo.src },
            { id: OPTION_IDS.TEAMS, label: 'Teams', comingSoon: true, image: teamsLogo.src },
        ],
    },
    {
        id: CATEGORY_IDS.LOGS,
        label: 'Logs',
        multiSelect: true,
        options: [
            { id: OPTION_IDS.DATADOG_LOGS, label: 'Datadog', image: datadogLogo.src },
            { id: OPTION_IDS.LOKI, label: 'Loki', image: lokiLogo.src },
            { id: OPTION_IDS.ELASTICSEARCH, label: 'Elasticsearch', image: elasticsearchLogo.src },
            { id: OPTION_IDS.CLOUDWATCH_LOGS, label: 'CloudWatch', image: awsLogo.src },
            { id: OPTION_IDS.GCP_LOGGING, label: 'GCP Logging', image: gcpLogo.src },
            { id: OPTION_IDS.SPLUNK, label: 'Splunk', comingSoon: true, image: splunkLogo.src },
        ],
    },
    {
        id: CATEGORY_IDS.INFRASTRUCTURE,
        label: 'Infrastructure',
        multiSelect: true,
        options: [
            { id: OPTION_IDS.KUBERNETES, label: 'Kubernetes', image: kubernetesLogo.src },
            {
                id: OPTION_IDS.AWS,
                label: 'Amazon Web Services',
                image: awsLogo.src,
                subOptions: [
                    { id: OPTION_IDS.ECS, label: 'ECS', image: awsLogo.src }
                ]
            },
            { id: OPTION_IDS.AZURE, label: 'Azure', image: azureLogo.src },
            { id: OPTION_IDS.GCP, label: 'Google Cloud Platform', image: gcpLogo.src },
        ],
    },
    {
        id: CATEGORY_IDS.SOURCE_CODE,
        label: 'Source Code',
        multiSelect: true,
        options: [
            { id: OPTION_IDS.GITHUB, label: 'GitHub', image: githubLogo.src },
            { id: OPTION_IDS.GITLAB, label: 'GitLab', comingSoon: true, image: gitlabLogo.src },
        ],
    },
    {
        id: CATEGORY_IDS.METRICS,
        label: 'Metrics',
        multiSelect: true,
        options: [
            { id: OPTION_IDS.PROMETHEUS, label: 'Prometheus', image: prometheusLogo.src },
            { id: OPTION_IDS.DATADOG_METRICS, label: 'Datadog', image: datadogLogo.src },
            { id: OPTION_IDS.CLOUDWATCH_METRICS, label: 'AWS CloudWatch', image: awsLogo.src },
            { id: OPTION_IDS.GCP_METRICS, label: 'GCP Metrics', image: gcpLogo.src },
        ],
    },
];

// ============================================================================
// Assessment Feedback Configuration
// ============================================================================

export const ASSESSMENT_FEEDBACK: FeedbackItem[] = [
    {
        id: 'auto-receive',
        title: 'Auto-receive alerts via Slack',
        description: 'Cleric joins your Slack channels to receive alerts and respond with investigations automatically',
        triggerCategories: [CATEGORY_IDS.COMMUNICATION],
    },
    {
        id: 'search-logs',
        title: 'Search logs and trace errors',
        description: 'Query log systems to find error patterns, trace request flows, and identify root causes across distributed services',
        triggerCategories: [CATEGORY_IDS.LOGS],
    },
    {
        id: 'query-metrics',
        title: 'Query metrics and detect anomalies',
        description: 'Analyze time-series data to identify performance degradations, resource bottlenecks, and abnormal patterns',
        triggerCategories: [CATEGORY_IDS.METRICS],
    },
    {
        id: 'debug-infra',
        title: 'Debug infrastructure state',
        description: 'Run kubectl, AWS CLI, and other cloud tools to inspect pods, containers, deployments, and cloud resources during investigations',
        triggerCategories: [CATEGORY_IDS.INFRASTRUCTURE],
    },
    {
        id: 'analyze-code',
        title: 'Analyze code, deployments, and CI/CD',
        description: 'Review recent code changes, examine deployment history, check CI/CD logs, and suggest code fixes based on error patterns',
        triggerCategories: [CATEGORY_IDS.SOURCE_CODE],
    },
];

// ============================================================================
// Helper to get assessment level by count
// ============================================================================

export function getAssessmentLevel(enabledCount: number): AssessmentLevel {
    return ASSESSMENT_LEVELS.find(
        (level) => enabledCount >= level.min && enabledCount <= level.max
    ) ?? ASSESSMENT_LEVELS[0];
}
