import React from 'react';
import { BarChart3, Users, TrendingUp, Globe, Mail, Database, Clock, Star } from 'lucide-react';

interface DashboardProps {
  professorData: any;
}

const Dashboard: React.FC<DashboardProps> = ({ professorData }) => {
  const stats = {
    totalSearches: 147,
    successfulMatches: 92,
    emailsSent: 67,
    responseRate: 34.5,
    avgAnalysisScore: 84.2,
    activeProfiles: 23
  };

  const recentActivity = [
    { action: 'Recherche OSINT', target: 'Dr. Marie Dubois', status: 'success', time: '2 min' },
    { action: 'Email généré', target: 'Prof. Jean Martin', status: 'success', time: '15 min' },
    { action: 'Analyse complétée', target: 'Dr. Sophie Bernard', status: 'success', time: '32 min' },
    { action: 'Données sauvegardées', target: 'Prof. Pierre Durand', status: 'success', time: '1h' },
    { action: 'Recherche échouée', target: 'Dr. Unknown', status: 'error', time: '2h' }
  ];

  const topTools = [
    { name: 'Sherlock', usage: 95, success: 87 },
    { name: 'Deep Personal', usage: 78, success: 92 },
    { name: 'RecWizard', usage: 65, success: 89 },
    { name: 'TheHarvester', usage: 82, success: 76 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Tableau de Bord Analytique</h2>
            <p className="text-slate-600">Vue d'ensemble des activités et performances OSINT</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Recherches Totales</p>
              <p className="text-3xl font-bold">{stats.totalSearches}</p>
            </div>
            <Globe className="w-12 h-12 text-blue-200" />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-blue-200 mr-1" />
            <span className="text-blue-100 text-sm">+12% ce mois</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Correspondances Réussies</p>
              <p className="text-3xl font-bold">{stats.successfulMatches}</p>
            </div>
            <Users className="w-12 h-12 text-green-200" />
          </div>
          <div className="mt-4 flex items-center">
            <Star className="w-4 h-4 text-green-200 mr-1" />
            <span className="text-green-100 text-sm">{Math.round((stats.successfulMatches / stats.totalSearches) * 100)}% de réussite</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Emails Envoyés</p>
              <p className="text-3xl font-bold">{stats.emailsSent}</p>
            </div>
            <Mail className="w-12 h-12 text-orange-200" />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-orange-200 mr-1" />
            <span className="text-orange-100 text-sm">{stats.responseRate}% taux de réponse</span>
          </div>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance des Outils</h3>
          <div className="space-y-4">
            {topTools.map((tool, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{tool.name}</span>
                    <span className="text-sm text-slate-500">{tool.success}% succès</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${tool.usage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Activité Récente</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 truncate">
                    <span className="font-medium">{activity.action}</span> - {activity.target}
                  </p>
                </div>
                <div className="flex items-center text-xs text-slate-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Professor Analysis */}
      {professorData && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Analyse Actuelle</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-medium text-slate-900">{professorData.name || 'Professeur'}</h4>
              <p className="text-sm text-slate-600">{professorData.title || 'Titre non spécifié'}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-slate-900">Présence Digitale</h4>
              <p className="text-sm text-slate-600">
                {professorData.socialProfiles?.length || 0} profils trouvés
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-slate-900">Publications</h4>
              <p className="text-sm text-slate-600">
                {professorData.academicInfo?.publications || 0} articles
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-medium text-slate-900">Citations</h4>
              <p className="text-sm text-slate-600">
                {professorData.academicInfo?.citations || 0} citations
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-center space-x-2 text-indigo-800 mb-2">
              <Database className="w-5 h-5" />
              <span className="font-medium">Statut de l'analyse</span>
            </div>
            <p className="text-sm text-indigo-700">
              Données collectées le {professorData.searchTimestamp ? 
                new Date(professorData.searchTimestamp).toLocaleDateString('fr-FR') : 
                'date inconnue'
              }. Analyse complète disponible avec recommandations personnalisées.
            </p>
          </div>
        </div>
      )}

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">État du Système</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-green-900">API Gemini</p>
              <p className="text-xs text-green-700">Opérationnel</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-green-900">Outils OSINT</p>
              <p className="text-xs text-green-700">5/5 disponibles</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-green-900">Base de Données</p>
              <p className="text-xs text-green-700">Synchronisée</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;