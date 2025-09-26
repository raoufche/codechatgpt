import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Heart, Eye, BarChart3, PieChart, Activity } from 'lucide-react';

interface AnalysisModuleProps {
  professorData: any;
}

const AnalysisModule: React.FC<AnalysisModuleProps> = ({ professorData }) => {
  const [analysisResults, setAnalysisResults] = useState<any>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<string[]>([]);

  const analysisTools = [
    {
      name: 'Deep Personal',
      category: 'Analyse de Personnalité',
      github: 'https://github.com/liaorongfan/deeppersonal',
      description: 'Analyse complète de la personnalité avec IA',
      features: ['Deep Learning', 'Analyse visuelle/audio', 'Comparaison complète'],
      icon: Brain,
      color: 'bg-purple-500'
    },
    {
      name: 'PsyCoT',
      category: 'Détection de Caractère',
      github: 'https://github.com/taoyang225/psycoT',
      description: 'Chain-of-Thought pour détecter le caractère',
      features: ['Analyse multi-étapes', 'LLM', 'Haute précision'],
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      name: 'D-DGCN',
      category: 'Réseau Graphique',
      github: 'https://github.com/djz233/d-dgcn',
      description: 'Réseau graphique profond pour personnalité',
      features: ['Analyse réseaux sociaux', 'Multi-modal', 'Traitement texte'],
      icon: Users,
      color: 'bg-green-500'
    },
    {
      name: 'PersonaliseVD',
      category: 'Analyse Émotionnelle',
      github: 'https://github.com/lei-sun-ruc',
      description: 'Détection de personnalité interprétée',
      features: ['Classification conversations', 'Modèles LLM', 'Interprétation résultats'],
      icon: Heart,
      color: 'bg-red-500'
    }
  ];

  const runAnalysis = async () => {
    if (!professorData) return;

    setIsAnalyzing(true);
    setAnalysisResults({});
    setActiveAnalysis([]);

    // Simuler l'exécution séquentielle des analyses
    for (const tool of analysisTools) {
      setActiveAnalysis(prev => [...prev, tool.name]);
      
      // Simuler le délai d'analyse
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Générer des résultats simulés
      const result = generateAnalysisResult(tool.name, professorData);
      setAnalysisResults(prev => ({ ...prev, [tool.name]: result }));
    }

    setIsAnalyzing(false);
  };

  const generateAnalysisResult = (toolName: string, data: any) => {
    switch (toolName) {
      case 'Deep Personal':
        return {
          personalityTraits: {
            openness: Math.floor(Math.random() * 40) + 60,
            conscientiousness: Math.floor(Math.random() * 30) + 70,
            extraversion: Math.floor(Math.random() * 40) + 40,
            agreeableness: Math.floor(Math.random() * 30) + 65,
            neuroticism: Math.floor(Math.random() * 30) + 20
          },
          cognitiveStyle: {
            analytical: 85,
            creative: 78,
            practical: 72,
            social: 68
          },
          leadershipPotential: 82,
          communicationStyle: 'Assertif et réfléchi',
          recommendedApproach: 'Approche intellectuelle avec reconnaissance de l\'expertise'
        };
      
      case 'PsyCoT':
        return {
          characterProfile: {
            dominantTraits: ['Analytique', 'Méthodique', 'Innovant'],
            workStyle: 'Collaboratif avec leadership intellectuel',
            motivationFactors: ['Reconnaissance académique', 'Impact recherche', 'Développement équipe'],
            decisionMaking: 'Basé sur les données avec considération éthique'
          },
          behavioralPredictions: {
            responseToChange: 'Adaptable avec préparation',
            stressManagement: 'Bon avec support',
            teamDynamics: 'Leadership naturel'
          },
          recruitmentFit: 92
        };
      
      case 'D-DGCN':
        return {
          socialNetworkAnalysis: {
            networkSize: 'Large (1000+ connexions)',
            networkDiversity: 'Très élevée',
            influenceScore: 78,
            collaborationPatterns: ['Interdisciplinaire', 'International', 'Mentoring']
          },
          professionalReputation: {
            peerRecognition: 'Élevée',
            industryStanding: 'Expert reconnu',
            thoughtLeadership: 85
          },
          adaptabilityScore: 89
        };
      
      case 'PersonaliseVD':
        return {
          emotionalIntelligence: {
            selfAwareness: 84,
            socialAwareness: 79,
            emotionalRegulation: 82,
            relationshipManagement: 77
          },
          communicationPatterns: {
            style: 'Professionnel et engageant',
            preferred_channels: ['Email formel', 'Réunions en personne', 'Présentations'],
            responseTime: 'Rapide pour sujets professionnels'
          },
          engagementPredictors: {
            interests: ['Innovation technologique', 'Développement équipe', 'Impact social'],
            motivators: ['Autonomie', 'Reconnaissance', 'Développement professionnel'],
            engagement_likelihood: 87
          }
        };
      
      default:
        return {};
    }
  };

  const getPersonalityColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Analyses Psychologiques & Comportementales</h2>
              <p className="text-slate-600">Intelligence artificielle pour l'analyse de profil</p>
            </div>
          </div>
          <button
            onClick={runAnalysis}
            disabled={!professorData || isAnalyzing}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            {isAnalyzing ? (
              <>
                <Activity className="w-5 h-5 animate-pulse" />
                <span>Analyse en cours...</span>
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                <span>Lancer les Analyses</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Tools */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Outils d'Analyse Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysisTools.map((tool, index) => {
            const Icon = tool.icon;
            const isActive = activeAnalysis.includes(tool.name);
            const hasResults = analysisResults[tool.name];
            
            return (
              <div key={index} className={`border-2 rounded-lg p-4 transition-colors ${
                isActive ? 'border-orange-300 bg-orange-50' :
                hasResults ? 'border-green-300 bg-green-50' :
                'border-slate-200 bg-white'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${tool.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{tool.name}</h4>
                    <p className="text-sm text-slate-600">{tool.category}</p>
                  </div>
                  <div className="ml-auto">
                    {isActive ? (
                      <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    ) : hasResults ? (
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    ) : (
                      <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-3">{tool.description}</p>
                <div className="space-y-1">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className="text-xs text-slate-500">• {feature}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis Results */}
      {Object.keys(analysisResults).length > 0 && (
        <div className="space-y-6">
          {/* Deep Personal Results */}
          {analysisResults['Deep Personal'] && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                Analyse de Personnalité (Deep Personal)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Traits de Personnalité (Big Five)</h4>
                  <div className="space-y-3">
                    {Object.entries(analysisResults['Deep Personal'].personalityTraits).map(([trait, score]) => (
                      <div key={trait} className="flex items-center space-x-3">
                        <span className="w-24 text-sm text-slate-700 capitalize">{trait}</span>
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getPersonalityColor(score as number)}`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900">{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Style Cognitif</h4>
                  <div className="space-y-3">
                    {Object.entries(analysisResults['Deep Personal'].cognitiveStyle).map(([style, score]) => (
                      <div key={style} className="flex items-center space-x-3">
                        <span className="w-24 text-sm text-slate-700 capitalize">{style}</span>
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getPersonalityColor(score as number)}`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900">{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Recommandations de Recrutement</h5>
                <p className="text-sm text-blue-800">
                  <strong>Potentiel de Leadership:</strong> {analysisResults['Deep Personal'].leadershipPotential}%<br />
                  <strong>Style de Communication:</strong> {analysisResults['Deep Personal'].communicationStyle}<br />
                  <strong>Approche Recommandée:</strong> {analysisResults['Deep Personal'].recommendedApproach}
                </p>
              </div>
            </div>
          )}

          {/* PsyCoT Results */}
          {analysisResults['PsyCoT'] && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                Analyse de Caractère (PsyCoT)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Traits Dominants</h4>
                  <div className="space-y-2">
                    {analysisResults['PsyCoT'].characterProfile.dominantTraits.map((trait: string, idx: number) => (
                      <span key={idx} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mr-2 mb-1">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Facteurs de Motivation</h4>
                  <div className="space-y-2">
                    {analysisResults['PsyCoT'].characterProfile.motivationFactors.map((factor: string, idx: number) => (
                      <div key={idx} className="flex items-center text-sm text-slate-700">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Adéquation Recrutement</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {analysisResults['PsyCoT'].recruitmentFit}%
                    </div>
                    <p className="text-sm text-slate-600">Score de compatibilité</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional analysis results can be added here following the same pattern */}
        </div>
      )}

      {!professorData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-900">Aucune donnée disponible</h3>
              <p className="text-yellow-700">Veuillez d'abord effectuer une recherche OSINT pour collecter les données à analyser.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisModule;