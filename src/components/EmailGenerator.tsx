import React, { useState } from 'react';
import { Mail, Wand2, Copy, Send, RefreshCw, Sparkles, Target, User, Building } from 'lucide-react';

interface EmailGeneratorProps {
  professorData: any;
}

const EmailGenerator: React.FC<EmailGeneratorProps> = ({ professorData }) => {
  const [universityInfo, setUniversityInfo] = useState({
    name: '',
    position: '',
    department: '',
    researchFocus: '',
    benefits: '',
    location: ''
  });
  
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailVariants, setEmailVariants] = useState<string[]>([]);
  const [selectedSystem, setSelectedSystem] = useState('RecWizard');

  const recommendationSystems = [
    {
      name: 'RecWizard',
      description: 'Plateforme intégrée pour systèmes de recommandation',
      github: 'https://github.com/mccauley-lab/recwizard',
      license: 'MIT',
      strengths: ['Interface intégrée', 'Multi-algorithmes', 'Personnalisation avancée'],
      icon: Wand2,
      color: 'bg-purple-500'
    },
    {
      name: 'OpenP5',
      description: 'Plateforme open source pour systèmes de recommandation LLM',
      github: 'https://github.com/agiresearch/openp5',
      license: 'Apache-2.0',
      strengths: ['Basé sur LLM', 'Open source', 'Flexibilité'],
      icon: Sparkles,
      color: 'bg-green-500'
    },
    {
      name: 'RecChorus2.0',
      description: 'Framework PyTorch flexible pour recommandations',
      github: 'https://github.com/thuwangcy/rechorus',
      license: 'MIT',
      strengths: ['PyTorch natif', 'Extensible', 'Performances optimisées'],
      icon: Target,
      color: 'bg-blue-500'
    }
  ];

  const generateEmail = async () => {
    if (!professorData || !universityInfo.name.trim()) {
      return;
    }

    setIsGenerating(true);
    
    // Simuler la génération avec l'API Gemini
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const emailContent = generatePersonalizedEmail();
    setGeneratedEmail(emailContent);
    
    // Générer des variantes
    const variants = await generateEmailVariants(emailContent);
    setEmailVariants(variants);
    
    setIsGenerating(false);
  };

  const generatePersonalizedEmail = () => {
    const analysisData = professorData?.analysisResults;
    const personalityInsights = analysisData?.['Deep Personal'];
    const characterProfile = analysisData?.['PsyCoT'];
    
    const template = `Objet: Opportunité unique de ${universityInfo.position} - ${universityInfo.name}

Cher(e) ${professorData.title || 'Professeur'} ${professorData.name},

J'espère que ce message vous trouve en excellente santé et que vos recherches en ${professorData.academicInfo?.researchAreas?.join(', ') || 'votre domaine'} progressent admirablement.

## Reconnaissance de votre expertise

Votre travail remarquable, particulièrement vos ${professorData.academicInfo?.publications || 'nombreuses'} publications et vos ${professorData.academicInfo?.citations || 'nombreuses'} citations, a attiré notre attention. Votre approche ${personalityInsights?.communicationStyle || 'innovante'} et votre style de leadership ${characterProfile?.characterProfile?.workStyle || 'collaboratif'} correspondent parfaitement à la culture de notre institution.

## Opportunité proposée

L'${universityInfo.name} recherche un(e) ${universityInfo.position} exceptionnel(le) pour rejoindre notre ${universityInfo.department}. Cette position offre :

${universityInfo.benefits.split('\n').map(benefit => `• ${benefit.trim()}`).filter(Boolean).join('\n')}

## Pourquoi cette opportunité vous correspond

Basé sur notre analyse de votre profil professionnel :

${personalityInsights?.recommendedApproach ? `• **Approche personnalisée** : ${personalityInsights.recommendedApproach}` : ''}
${characterProfile?.recruitmentFit ? `• **Compatibilité élevée** : Score de ${characterProfile.recruitmentFit}% d'adéquation avec notre environnement` : ''}
${characterProfile?.characterProfile?.motivationFactors ? `• **Alignement des objectifs** : Nos opportunités correspondent à vos motivations : ${characterProfile.characterProfile.motivationFactors.join(', ')}` : ''}

## Notre engagement envers l'excellence

Située à ${universityInfo.location}, notre université offre un environnement stimulant où l'innovation et la recherche de pointe sont valorisées. Nous croyons que votre expertise en ${universityInfo.researchFocus} enrichirait significativement notre communauté académique.

## Prochaines étapes

Je serais honoré(e) de discuter de cette opportunité avec vous de manière plus approfondie. Seriez-vous disponible pour un entretien informel la semaine prochaine ? Je peux m'adapter à votre emploi du temps.

En attendant votre réponse, je vous prie d'agréer, cher(e) ${professorData.title || 'Professeur'} ${professorData.name}, l'expression de mes salutations les plus distinguées.

Cordialement,

[Votre nom]
[Votre titre]
${universityInfo.name}
[Votre email]
[Votre téléphone]

P.S. : Si vous souhaitez en savoir plus sur notre département et nos projets en cours, n'hésitez pas à consulter notre site web ou à me contacter directement.

---
Généré avec ${selectedSystem} - Intelligence Artificielle pour le recrutement académique
Données analysées avec des outils OSINT avancés et techniques d'IA`;

    return template;
  };

  const generateEmailVariants = async (baseEmail: string) => {
    // Simuler la génération de variantes
    return [
      baseEmail.replace(/cher\(e\)/gi, 'Chère/Cher').replace(/## /g, ''),
      baseEmail.replace(/J'espère que ce message/g, 'Je me permets de vous contacter car'),
      baseEmail.replace(/## Opportunité proposée/g, '## Une proposition exceptionnelle')
    ];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-orange-600" />
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Générateur d'Email Personnalisé</h2>
              <p className="text-slate-600">IA et systèmes de recommandation pour recrutement académique</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Gemini AI</span>
          </div>
        </div>
      </div>

      {/* Recommendation Systems Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Systèmes de Recommandation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {recommendationSystems.map((system) => {
            const Icon = system.icon;
            const isSelected = selectedSystem === system.name;
            
            return (
              <button
                key={system.name}
                onClick={() => setSelectedSystem(system.name)}
                className={`p-4 border-2 rounded-lg transition-all ${
                  isSelected 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-slate-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${system.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-slate-900">{system.name}</h4>
                    <p className="text-xs text-slate-500">{system.license}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-3">{system.description}</p>
                <div className="space-y-1">
                  {system.strengths.map((strength, idx) => (
                    <div key={idx} className="text-xs text-slate-500">• {strength}</div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-slate-600">
          Système sélectionné : <strong>{selectedSystem}</strong> - 
          Ce système sera utilisé pour optimiser la personnalisation de l'email
        </p>
      </div>

      {/* University Information Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Building className="w-5 h-5 text-orange-600 mr-2" />
          Informations sur l'Université
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nom de l'Université
            </label>
            <input
              type="text"
              value={universityInfo.name}
              onChange={(e) => setUniversityInfo(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Université de Technologie de Paris"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Position Proposée
            </label>
            <input
              type="text"
              value={universityInfo.position}
              onChange={(e) => setUniversityInfo(prev => ({ ...prev, position: e.target.value }))}
              placeholder="Professeur Associé"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Département
            </label>
            <input
              type="text"
              value={universityInfo.department}
              onChange={(e) => setUniversityInfo(prev => ({ ...prev, department: e.target.value }))}
              placeholder="Informatique et IA"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Localisation
            </label>
            <input
              type="text"
              value={universityInfo.location}
              onChange={(e) => setUniversityInfo(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Paris, France"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Focus de Recherche
          </label>
          <input
            type="text"
            value={universityInfo.researchFocus}
            onChange={(e) => setUniversityInfo(prev => ({ ...prev, researchFocus: e.target.value }))}
            placeholder="Intelligence Artificielle, Machine Learning"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Avantages & Opportunités (un par ligne)
          </label>
          <textarea
            value={universityInfo.benefits}
            onChange={(e) => setUniversityInfo(prev => ({ ...prev, benefits: e.target.value }))}
            placeholder="Salaire compétitif avec évolution&#10;Budget recherche de 50k€ annuel&#10;Équipe de 5 doctorants&#10;Sabbatique tous les 7 ans&#10;Collaboration internationale"
            rows={5}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={generateEmail}
          disabled={!professorData || !universityInfo.name.trim() || isGenerating}
          className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-medium transition-colors shadow-lg"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>Génération avec {selectedSystem}...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-6 h-6" />
              <span>Générer Email Personnalisé</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Email */}
      {generatedEmail && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Email Généré</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => copyToClipboard(generatedEmail)}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                title="Copier l'email"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={generateEmail}
                className="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition-colors"
                title="Régénérer"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-orange-500">
            <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">
              {generatedEmail}
            </pre>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-green-800">
              <Sparkles className="w-4 h-4" />
              <span>Email généré avec {selectedSystem} et optimisé via l'analyse OSINT & IA</span>
            </div>
          </div>
        </div>
      )}

      {/* Email Variants */}
      {emailVariants.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Variantes d'Email</h3>
          <div className="space-y-4">
            {emailVariants.map((variant, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900">Variante {index + 1}</h4>
                  <button
                    onClick={() => copyToClipboard(variant)}
                    className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-slate-50 rounded p-3 max-h-48 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-xs text-slate-600 font-sans">
                    {variant.slice(0, 500)}...
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!professorData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-900">Données professeur requises</h3>
              <p className="text-yellow-700">Effectuez d'abord une recherche OSINT et des analyses pour générer un email personnalisé.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailGenerator;