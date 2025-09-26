import React, { useState } from 'react';
import { Search, Database, Brain, Mail, Settings, User, FileText, Globe, BarChart3 } from 'lucide-react';
import SearchModule from './components/SearchModule';
import DatabaseModule from './components/DatabaseModule';
import AnalysisModule from './components/AnalysisModule';
import EmailGenerator from './components/EmailGenerator';
import Dashboard from './components/Dashboard';

type TabType = 'search' | 'database' | 'analysis' | 'email' | 'dashboard';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [professorData, setProfessorData] = useState<any>(null);

  const tabs = [
    { id: 'search', label: 'Recherche OSINT', icon: Search, color: 'bg-blue-500' },
    { id: 'database', label: 'Base de Données', icon: Database, color: 'bg-green-500' },
    { id: 'analysis', label: 'Analyses', icon: Brain, color: 'bg-purple-500' },
    { id: 'email', label: 'Email Generator', icon: Mail, color: 'bg-orange-500' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'bg-indigo-500' },
  ];

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'search':
        return <SearchModule onDataFound={setProfessorData} />;
      case 'database':
        return <DatabaseModule professorData={professorData} />;
      case 'analysis':
        return (
          <AnalysisModule
            professorData={professorData}
            onComplete={(analysisResults) =>
              setProfessorData((prev: any) =>
                prev ? { ...prev, analysisResults } : prev
              )
            }
          />
        );
      case 'email':
        return <EmailGenerator professorData={professorData} />;
      case 'dashboard':
        return <Dashboard professorData={professorData} />;
      default:
        return <SearchModule onDataFound={setProfessorData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">OSINT Professor Analyzer</h1>
                <p className="text-sm text-slate-600">Intelligence et Analyse Académique</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Settings className="w-5 h-5 text-slate-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className={`p-1.5 rounded-md ${isActive ? tab.color : 'bg-slate-100'}`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveModule()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              © 2025 OSINT Professor Analyzer. Développé avec des technologies avancées d'IA.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-slate-500">Powered by Gemini AI</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;