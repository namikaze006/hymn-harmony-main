export interface Himno {
  numero: number;
  titulo: string;
  contenido: string;
  estrofas: string[];
}

export interface SearchResult {
  himno: Himno;
  snippet?: string;
  matchType: 'titulo' | 'contenido' | 'numero';
}
