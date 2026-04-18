'use client';

import { motion } from 'framer-motion';
import {
  Monitor,
  LayoutDashboard,
  Code2,
  PenLine,
  Keyboard,
  Mouse,
  Camera,
  Headphones,
  PenTool,
  SquareStack,
} from 'lucide-react';
import {
  SiApple,
  SiLg,
  SiNotion,
  SiConfluence,
  SiJira,
  SiTrello,
  SiClickup,
  SiMiro,
  SiGithub,
  SiMysql,
  SiDatagrip,
  SiFigma,
  SiFramer,
} from 'react-icons/si';
import type { ToolCategory } from '@/types';

// Defined inside the client component — no serialization needed
const SI_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  SiApple,
  SiLg,
  SiNotion,
  SiConfluence,
  SiJira,
  SiTrello,
  SiClickup,
  SiMiro,
  SiGithub,
  SiMysql,
  SiDatagrip,
  SiFigma,
  SiFramer,
};

const LUCIDE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  LayoutDashboard,
  Code2,
  PenLine,
  Keyboard,
  Mouse,
  Camera,
  Headphones,
  PenTool,
  SquareStack,
};

interface ToolboxGridProps {
  toolboxData: ToolCategory[];
}

export function ToolboxGrid({ toolboxData }: ToolboxGridProps) {
  return (
    <div className="space-y-16">
      {toolboxData.map((category) => {
        const CategoryIcon =
          LUCIDE_ICON_MAP[category.lucideIcon] ?? Monitor;

        return (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Category heading */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <CategoryIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
            </div>

            {/* Items grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {category.items.map((item) => {
                const SiIcon = item.siIcon ? SI_ICON_MAP[item.siIcon] : null;
                const LucideIcon = item.lucideIcon
                  ? LUCIDE_ICON_MAP[item.lucideIcon]
                  : null;
                const Icon = SiIcon ?? LucideIcon;

                return (
                  <motion.div
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center hover:border-indigo-500/30 hover:shadow-md transition-all duration-300 cursor-default"
                  >
                    {Icon ? (
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center mb-3">
                        <span className="text-lg">🛠</span>
                      </div>
                    )}
                    <p className="font-semibold text-sm text-foreground mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
