import { Search, BookOpen, Heart } from 'lucide-react';

interface TabBarProps {
  activeTab: 'search' | 'index' | 'favorites';
  onTabChange: (tab: 'search' | 'index' | 'favorites') => void;
}

const tabs = [
  { id: 'search' as const, label: 'Inicio', icon: Search },
  { id: 'index' as const, label: 'Índice', icon: BookOpen },
  { id: 'favorites' as const, label: 'Favoritos', icon: Heart },
];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg safe-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around px-4 py-1.5">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 transition-all ${
                isActive ? 'text-tab-active' : 'text-tab-inactive hover:text-foreground'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1.5 h-1 w-8 rounded-full bg-primary" />
              )}
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={`transition-transform ${isActive ? 'scale-110' : ''} ${isActive && id === 'favorites' ? 'fill-current' : ''}`}
              />
              <span className="text-[11px] font-semibold font-ui">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
