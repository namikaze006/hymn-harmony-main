import { Search, List, User } from 'lucide-react';

interface TabBarProps {
  activeTab: 'search' | 'index' | 'profile';
  onTabChange: (tab: 'search' | 'index' | 'profile') => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: 'search', icon: Search, label: 'Inicio' },
    { id: 'index', icon: List, label: 'Himnos' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-6 pt-2 pointer-events-none">
      {/* 
          Requirements:
          - Dark mode: Background White
          - Light mode: Contrast color (Primary/Dark)
      */}
      <div className="mx-auto max-w-sm rounded-[2rem] shadow-2xl pointer-events-auto p-2 border border-zinc-200 dark:border-white/10
          bg-primary text-white dark:bg-white dark:text-zinc-900">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center gap-1 flex-1 py-3 px-2 rounded-2xl transition-colors ${isActive
                    ? 'bg-white/20 dark:bg-primary/10 font-bold'
                    : 'opacity-70 hover:opacity-100'
                  }`}
              >
                <Icon
                  size={20}
                  className={isActive ? 'scale-110' : ''}
                />
                <span className="text-[10px] font-black uppercase tracking-tighter font-ui">
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-current" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
