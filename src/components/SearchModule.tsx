import React, { useState } from 'react';
import { Search, User, Mail, Globe as Globe2, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface SearchModuleProps {
  onDataFound: (data: any) => void;
}

const SearchModule: React.FC<SearchModuleProps> = ({ onDataFound }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeTools, setActiveTools] = useState<string[]>([]);

  const osintTools = [
    {
      name: 'Sherlock',
      description: 'Recherche de présence sur les réseaux sociaux',
      github: 'https://github.com/sherlock-project/sherlock',
      command: 'python3 sherlock',
      features: ['Recherche rapide', 'Rapports détaillés', 'Personnalisable'],
      status: 'ready'
    },
    {
      name: 'TheHarvester',
      description: 'Collection automatique d\'informations',
      github: 'https://github.com/laramies/theHarvester',
      command: 'theHarvester -d domain.com',
      features: ['Collection emails', 'Sous-domaines', 'Recherche avancée'],
      status: 'ready'
    },
    {
      name: 'SpiderFoot',
      description: 'Plateforme de reconnaissance complète',
      github: 'https://github.com/smicallef/spiderfoot',
      command: 'python3 sf.py -l 127.0.0.1:5001',
      features: ['Interface Web', 'Recherche unifiée', 'Export multi-format'],
      status: 'ready'
    },
    {
      name: 'Social Analyzer',
      description: 'Analyse des profils personnels',
      github: 'https://github.com/qeeqbox/social-analyzer',
      command: 'python3 app.py',
      features: ['Analyse profils', 'Multi-plateformes', 'Rapports détaillés'],
      status: 'ready'
    },
    {
      name: 'Twint',
      description: 'Analyse Twitter sans API',
      github: 'https://github.com/twintproject/twint',
      command: 'twint -u username',
      features: ['Scraping Twitter', 'Analyse temporelle', 'Export données'],
      status: 'ready'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResults([]);
    setActiveTools([]);

    // Simulation du processus de recherche OSINT
    const toolsToRun = osintTools.slice(0, 3); // Utiliser les 3 premiers outils
    
    for (const tool of toolsToRun) {
      setActiveTools(prev => [...prev, tool.name]);
      
      // Simuler le délai de recherche
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler des résultats
      const mockResult = {
        tool: tool.name,
        status: 'success',
        data: generateMockData(tool.name, searchQuery),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setSearchResults(prev => [...prev, mockResult]);
    }

    // Agrégation finale des données
    const aggregatedData = {
      name: searchQuery,
      email: email,
      title: title,
      searchTimestamp: new Date().toISOString(),
      osintResults: searchResults,
      socialProfiles: generateSocialProfiles(searchQuery),
      academicInfo: generateAcademicInfo(searchQuery),
      digitalFootprint: generateDigitalFootprint()
    };

    onDataFound(aggregatedData);
    setIsSearching(false);
  };

  const generateMockData = (toolName: string, query: string) => {
    switch (toolName) {
      case 'Sherlock':
        return {
          platforms: ['GitHub', 'LinkedIn', 'Twitter', 'ResearchGate', 'ORCID'],
          profiles: [
            { platform: 'GitHub', url: `https://github.com/${query.toLowerCase()}`, verified: true },
            { platform: 'LinkedIn', url: `https://linkedin.com/in/${query.toLowerCase()}`, verified: true },
            { platform: 'ResearchGate', url: `https://researchgate.net/profile/${query}`, verified: false }
          ]
        };
      case 'TheHarvester':
        return {
          emails: [`${query.toLowerCase()}@university.edu`, `${query.toLowerCase()}@research.org`],
          subdomains: ['research.university.edu', 'lab.university.edu'],
          hosts: ['192.168.1.100', '10.0.0.50']
        };
      case 'SpiderFoot':
        return {
          webPresence: ['Personal Website', 'Academic Profile', 'Research Publications'],
          affiliations: ['University XYZ', 'Research Institute ABC'],
          publications: 45,
          citations: 1250
        };
      default:
        return {};
    }
  };

  const generateSocialProfiles = (name: string) => [
    { platform: 'Twitter', handle: `@${name.toLowerCase()}`, followers: 2500, activity: 'Active' },
    { platform: 'LinkedIn', connections: 1200, industry: 'Higher Education', activity: 'Regular' },
    { platform: 'ResearchGate', publications: 45, citations: 1250, hIndex: 18 }
  ];

  const generateAcademicInfo = (name: string) => ({
    university: 'University of Technology',
    department: 'Computer Science',
    position: 'Associate Professor',
    researchAreas: ['Machine Learning', 'Data Mining', 'Artificial Intelligence'],
    yearsExperience: 12,
    publications: 45,
    citations: 1250
  });

  const generateDigitalFootprint = () => ({
    webPresence: 'High',
    lastActivity: '2 days ago',
    contentFrequency: 'Weekly',
    engagementLevel: 'Medium',
    professionalNetworks: ['IEEE', 'ACM', 'ResearchGate']
  });

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Search className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-900">Recherche OSINT Multi-Outils</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Nom du Professeur
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Dr. Jean Dupont"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email (Optionnel)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jean.dupont@university.edu"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Globe2 className="w-4 h-4 inline mr-1" />
              Titre/Position
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Professeur, Chercheur"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={!searchQuery.trim() || isSearching}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isSearching ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Recherche en cours...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Lancer la Recherche OSINT</span>
            </>
          )}
        </button>
      </div>

      {/* OSINT Tools Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Outils OSINT Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {osintTools.map((tool, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-slate-900">{tool.name}</h4>
                <div className={`w-2 h-2 rounded-full ${
                  activeTools.includes(tool.name) ? 'bg-orange-400 animate-pulse' :
                  searchResults.some(r => r.tool === tool.name) ? 'bg-green-400' : 'bg-slate-300'
                }`}></div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{tool.description}</p>
              <div className="space-y-1">
                {tool.features.map((feature, idx) => (
                  <div key={idx} className="text-xs text-slate-500 flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Résultats de Recherche</h3>
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-900 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {result.tool}
                  </h4>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {result.timestamp}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSearching && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Loader className="w-6 h-6 text-blue-600 animate-spin" />
            <h3 className="text-lg font-semibold text-blue-900">Recherche OSINT en Cours</h3>
          </div>
          <div className="space-y-2">
            {activeTools.map((tool, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-800">Exécution de {tool}...</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModule;