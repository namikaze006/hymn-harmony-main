import { useState } from 'react';
import himnarioData from '@/data/himnario_bautista.json';
import type { Himno } from '@/types/himno';
import { useFavorites } from '@/hooks/useFavorites';
import { useTheme } from '@/hooks/useTheme';
import TabBar from '@/components/TabBar';
import SearchPanel from '@/components/SearchPanel';
import HymnIndex from '@/components/HymnIndex';
import FavoritesPanel from '@/components/FavoritesPanel';
import ProfilePanel from '@/components/ProfilePanel';
import HistoryPanel from '@/components/HistoryPanel';
import HymnView from '@/components/HymnView';

const himnos: Himno[] = himnarioData as Himno[];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'index' | 'profile'>('search');
  const [profileSubView, setProfileSubView] = useState<'menu' | 'favorites' | 'history'>('menu');
  const [selectedHymn, setSelectedHymn] = useState<Himno | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { theme, toggleTheme } = useTheme();

  if (selectedHymn) {
    return (
      <HymnView
        himno={selectedHymn}
        isFavorite={isFavorite(selectedHymn.numero)}
        onToggleFavorite={toggleFavorite}
        onBack={() => setSelectedHymn(null)}
      />
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background">
      {activeTab === 'search' && (
        <SearchPanel
          himnos={himnos}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelectHymn={setSelectedHymn}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      {activeTab === 'index' && (
        <HymnIndex
          himnos={himnos}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelectHymn={setSelectedHymn}
        />
      )}
      {activeTab === 'profile' && profileSubView === 'menu' && (
        <ProfilePanel
          onViewFavorites={() => setProfileSubView('favorites')}
          onViewHistory={() => setProfileSubView('history')}
        />
      )}
      {activeTab === 'profile' && profileSubView === 'favorites' && (
        <FavoritesPanel
          himnos={himnos}
          favorites={favorites}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelectHymn={setSelectedHymn}
          onBack={() => setProfileSubView('menu')}
        />
      )}
      {activeTab === 'profile' && profileSubView === 'history' && (
        <HistoryPanel onBack={() => setProfileSubView('menu')} />
      )}
      <TabBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'profile') setProfileSubView('menu');
        }}
      />
    </div>
  );
};

export default Index;
