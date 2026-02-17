import { Search, BookOpen, User } from 'lucide-react';

interface TabBarProps {
  activeTab: 'search' | 'index' | 'profile';
  onTabChange: (tab: 'search' | 'index' | 'profile') => void;
}

const tabs = [
  { id: 'search' as const, label: 'Inicio', icon: Search },
  { id: 'index' as const, label: 'Índice', icon: BookOpen },
  { id: 'profile' as const, label: 'Perfil', icon: User },
];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="bg-card/80 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl safe-bottom p-2 flex items-center justify-around card-shadow">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`relative flex flex-col items-center gap-1 flex-1 py-3 px-2 rounded-[2rem] transition-all duration-300 ${isActive ? 'bg-primary text-primary-foreground card-shadow scale-105' : 'text-muted-foreground hover:bg-muted/50'
                }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-70'}`}
              />
              <span className={`text-[10px] font-bold font-ui transition-all ${isActive ? 'opacity-100' : 'opacity-0 h-0 hidden'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
