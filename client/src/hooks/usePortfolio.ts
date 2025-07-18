import { create } from 'zustand';

interface PortfolioState {
  activeSection: string | null;
  isLoading: boolean;
  setActiveSection: (section: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const usePortfolio = create<PortfolioState>((set) => ({
  activeSection: null,
  isLoading: false,
  setActiveSection: (section) => set({ activeSection: section }),
  setLoading: (loading) => set({ isLoading: loading })
}));
