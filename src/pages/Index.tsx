import { useState } from 'react';
import himnarioData from '@/data/himnario_bautista.json';
import type { Himno } from '@/types/himno';
import { useFavorites } from '@/hooks/useFavorites';
import { useTheme } from '@/hooks/useTheme';
import TabBar from '@/components/TabBar';
import SearchPanel from '@/components/SearchPanel';
import HymnIndex from '@/components/HymnIndex';
import FavoritesPanel from '@/components/FavoritesPanel';
import HymnView from '@/components/HymnView';

const himnos: Himno[] = himnarioData as Himno[];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'index' | 'favorites'>('search');
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
      {activeTab === 'favorites' && (
        <FavoritesPanel
          himnos={himnos}
          favorites={favorites}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSelectHymn={setSelectedHymn}
        />
      )}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
