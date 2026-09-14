import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PortfolioStore, 
  ProfileData, 
  ProjectItem, 
  ArticleItem, 
  ToolItem, 
  NavPage 
} from '../types';
import { initialPortfolioData } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'dev_brand_portfolio_store_v1';

interface DataContextType {
  data: PortfolioStore;
  activePage: NavPage;
  setActivePage: (page: NavPage) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  isQuickSheetOpen: boolean;
  setIsQuickSheetOpen: (open: boolean) => void;
  isElevatorOpen?: boolean;
  setIsElevatorOpen: (open: boolean) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  isResumeOpen?: boolean;
  setIsResumeOpen: (open: boolean) => void;
  
  // CMS CRUD Methods
  updateProfile: (profile: ProfileData) => void;
  addProject: (project: ProjectItem) => void;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  addArticle: (article: ArticleItem) => void;
  updateArticle: (article: ArticleItem) => void;
  deleteArticle: (id: string) => void;
  addTool: (tool: ToolItem) => void;
  updateTool: (tool: ToolItem) => void;
  deleteTool: (id: string) => void;
  
  // Data management
  resetToDefaultData: () => void;
  exportDataToJson: () => string;
  importDataFromJson: (jsonStr: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioStore>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse portfolio store from localStorage', e);
    }
    return initialPortfolioData;
  });

  const [activePage, setActivePage] = useState<NavPage>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isQuickSheetOpen, setIsQuickSheetOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProjectId, selectedArticleId]);

  const updateProfile = (profile: ProfileData) => {
    setData((prev) => ({ ...prev, profile }));
  };

  const addProject = (project: ProjectItem) => {
    setData((prev) => ({
      ...prev,
      projects: [project, ...prev.projects]
    }));
  };

  const updateProject = (project: ProjectItem) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === project.id ? project : p))
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const addArticle = (article: ArticleItem) => {
    setData((prev) => ({
      ...prev,
      articles: [article, ...prev.articles]
    }));
  };

  const updateArticle = (article: ArticleItem) => {
    setData((prev) => ({
      ...prev,
      articles: prev.articles.map((a) => (a.id === article.id ? article : a))
    }));
  };

  const deleteArticle = (id: string) => {
    setData((prev) => ({
      ...prev,
      articles: prev.articles.filter((a) => a.id !== id)
    }));
  };

  const addTool = (tool: ToolItem) => {
    setData((prev) => ({
      ...prev,
      tools: [tool, ...prev.tools]
    }));
  };

  const updateTool = (tool: ToolItem) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.id === tool.id ? tool : t))
    }));
  };

  const deleteTool = (id: string) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t.id !== id)
    }));
  };

  const resetToDefaultData = () => {
    setData(initialPortfolioData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialPortfolioData));
    } catch (e) {
      console.error(e);
    }
  };

  const exportDataToJson = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importDataFromJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.profile && Array.isArray(parsed.projects) && Array.isArray(parsed.articles) && Array.isArray(parsed.tools)) {
        setData(parsed);
        return true;
      }
    } catch (err) {
      console.error('Invalid JSON file format', err);
    }
    return false;
  };

  return (
    <DataContext.Provider
      value={{
        data,
        activePage,
        setActivePage,
        selectedProjectId,
        setSelectedProjectId,
        selectedArticleId,
        setSelectedArticleId,
        isQuickSheetOpen,
        setIsQuickSheetOpen,
        isElevatorOpen: isQuickSheetOpen,
        setIsElevatorOpen: setIsQuickSheetOpen,
        isResumeModalOpen,
        setIsResumeModalOpen,
        isResumeOpen: isResumeModalOpen,
        setIsResumeOpen: setIsResumeModalOpen,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addArticle,
        updateArticle,
        deleteArticle,
        addTool,
        updateTool,
        deleteTool,
        resetToDefaultData,
        exportDataToJson,
        importDataFromJson
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a DataProvider');
  }
  return context;
};
