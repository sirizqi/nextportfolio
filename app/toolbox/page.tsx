import type { Metadata } from 'next';
import { ToolboxGrid } from './ToolboxGrid';
import type { ToolCategory } from '@/types';

export const metadata: Metadata = {
  title: 'Toolbox',
  description:
    "Rizqi Sarasajati's curated list of hardware and software powering daily workflow.",
  openGraph: {
    title: 'Toolbox | siRizqi',
    description: 'Hardware and software powering my daily workflow.',
  },
};

const toolboxData: ToolCategory[] = [
  {
    category: 'Devices',
    lucideIcon: 'Monitor',
    items: [
      {
        name: 'MacBook Air M1 8/256GB',
        siIcon: 'SiApple',
        description: 'Primary development machine — fast, silent, all-day battery.',
      },
      {
        name: 'AOC Monitor',
        lucideIcon: 'Monitor',
        description: 'Secondary display for extended workspace.',
      },
      {
        name: 'LG Monitor',
        siIcon: 'SiLg',
        description: 'Tertiary display for reference and communication.',
      },
      {
        name: 'Rexus Daxa Keyboard',
        lucideIcon: 'Keyboard',
        description: 'Mechanical keyboard for satisfying daily typing.',
      },
      {
        name: 'S-Tech Mouse',
        lucideIcon: 'Mouse',
        description: 'Ergonomic mouse for precise navigation.',
      },
      {
        name: 'Nemesis Webcam',
        lucideIcon: 'Camera',
        description: 'Webcam for clear video meetings and recordings.',
      },
      {
        name: 'Kaze Headset',
        lucideIcon: 'Headphones',
        description: 'Noise-isolating headset for focused deep work.',
      },
    ],
  },
  {
    category: 'Product Management',
    lucideIcon: 'LayoutDashboard',
    items: [
      {
        name: 'Notion',
        siIcon: 'SiNotion',
        description: 'All-in-one workspace for notes, docs & wikis.',
      },
      {
        name: 'Confluence',
        siIcon: 'SiConfluence',
        description: 'Team documentation, specs & knowledge base.',
      },
      {
        name: 'Microsoft Loop',
        lucideIcon: 'SquareStack',
        description: 'Collaborative workspaces for cross-team alignment.',
      },
      {
        name: 'Jira',
        siIcon: 'SiJira',
        description: 'Issue tracking & sprint/backlog management.',
      },
      {
        name: 'Trello',
        siIcon: 'SiTrello',
        description: 'Visual kanban boards for lightweight project tracking.',
      },
      {
        name: 'ClickUp',
        siIcon: 'SiClickup',
        description: 'All-in-one project & task management platform.',
      },
      {
        name: 'Miro',
        siIcon: 'SiMiro',
        description: 'Collaborative online whiteboard for workshops & ideation.',
      },
      {
        name: 'tldraw',
        lucideIcon: 'PenTool',
        description: 'Infinite canvas for quick diagrams and sketches.',
      },
    ],
  },
  {
    category: 'Software Engineering',
    lucideIcon: 'Code2',
    items: [
      {
        name: 'VS Code',
        lucideIcon: 'Code2',
        description: 'Primary code editor with extensive extension ecosystem.',
      },
      {
        name: 'GitHub',
        siIcon: 'SiGithub',
        description: 'Version control, collaboration & CI/CD workflows.',
      },
      {
        name: 'Antares (DB Client)',
        siIcon: 'SiMysql',
        description: 'Lightweight database client for MySQL & PostgreSQL.',
      },
      {
        name: 'DataGrip',
        siIcon: 'SiDatagrip',
        description: 'JetBrains IDE for advanced database management.',
      },
    ],
  },
  {
    category: 'Product Design',
    lucideIcon: 'PenLine',
    items: [
      {
        name: 'Figma',
        siIcon: 'SiFigma',
        description: 'Primary UI/UX design, prototyping & design system tool.',
      },
      {
        name: 'Framer',
        siIcon: 'SiFramer',
        description: 'High-fidelity interactive prototyping & web publishing.',
      },
      {
        name: 'Adobe Illustrator',
        lucideIcon: 'PenTool',
        description: 'Vector graphics, icons & brand identity assets.',
      },
    ],
  },
];

export default function ToolboxPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Devices &amp; Tools <span className="text-gradient">I Use</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A curated list of the hardware and software powering my daily workflow.
          </p>
        </div>

        {/* Data-only props — no function/component serialization */}
        <ToolboxGrid toolboxData={toolboxData} />
      </div>
    </div>
  );
}
