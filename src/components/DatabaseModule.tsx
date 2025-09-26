import React, { useState } from 'react';
import { Database, Plus, FileText, Save, Upload, Download, CreditCard as Edit3, Trash2 } from 'lucide-react';

interface DatabaseModuleProps {
  professorData: any;
}

const DatabaseModule: React.FC<DatabaseModuleProps> = ({ professorData }) => {
  const [manualData, setManualData] = useState({
    scientificArticles: '',
    academicProjects: '',
    conferences: '',
    booksWritten: '',
    awards: '',
    researchGrants: '',
    collaborations: '',
    patents: '',
    editorialBoards: '',
    reviewerExperience: ''
  });

  const [savedEntries, setSavedEntries] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const dataFields = [
    { key: 'scientificArticles', label: 'Articles Scientifiques', icon: FileText, placeholder: 'Listez les articles scientifiques publiés...' },
    { key: 'academicProjects', label: 'Projets Académiques', icon: FileText, placeholder: 'Décrivez les projets académiques...' },
    { key: 'conferences', label: 'Conférences & Interventions', icon: FileText, placeholder: 'Conférences, symposiums, présentations...' },
    { key: 'booksWritten', label: 'Livres Écrits', icon: FileText, placeholder: 'Ouvrages, chapitres de livres...' },
    { key: 'awards', label: 'Prix & Distinctions', icon: FileText, placeholder: 'Prix académiques, distinctions...' },
    { key: 'researchGrants', label: 'Bourses de Recherche', icon: FileText, placeholder: 'Financements, subventions...' },
    { key: 'collaborations', label: 'Collaborations', icon: FileText, placeholder: 'Partenariats académiques...' },
    { key: 'patents', label: 'Brevets', icon: FileText, placeholder: 'Propriété intellectuelle...' }
  ];

  const handleSave = () => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      professorName: professorData?.name || 'Inconnu',
      osintData: professorData,
      manualData: { ...manualData },
      status: 'saved'
    };
    
    setSavedEntries(prev => [...prev, newEntry]);
    
    // Reset form
    setManualData({
      scientificArticles: '',
      academicProjects: '',
      conferences: '',
      booksWritten: '',
      awards: '',
      researchGrants: '',
      collaborations: '',
      patents: '',
      editorialBoards: '',
      reviewerExperience: ''
    });
    
    setShowAddForm(false);
  };

  const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setManualData(prev => ({ ...prev, [field]: content }));
      };
      reader.readAsText(file);
    }
  };

  const exportData = (entry: any) => {
    const dataStr = JSON.stringify(entry, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `professor_data_${entry.professorName.replace(/\s+/g, '_')}_${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const deleteEntry = (id: number) => {
    setSavedEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Database className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Base de Données Professeurs</h2>
              <p className="text-slate-600">Stockage et gestion des données académiques</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter Données</span>
          </button>
        </div>
      </div>

      {/* OSINT Data Summary */}
      {professorData && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Données OSINT Collectées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Informations Générales</h4>
              <div className="space-y-1 text-sm text-blue-700">
                <p><strong>Nom:</strong> {professorData.name}</p>
                <p><strong>Email:</strong> {professorData.email || 'Non disponible'}</p>
                <p><strong>Titre:</strong> {professorData.title || 'Non disponible'}</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Présence Digitale</h4>
              <div className="space-y-1 text-sm text-green-700">
                <p><strong>Profils sociaux:</strong> {professorData.socialProfiles?.length || 0}</p>
                <p><strong>Publications:</strong> {professorData.academicInfo?.publications || 0}</p>
                <p><strong>Citations:</strong> {professorData.academicInfo?.citations || 0}</p>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Activité</h4>
              <div className="space-y-1 text-sm text-purple-700">
                <p><strong>Dernière activité:</strong> {professorData.digitalFootprint?.lastActivity || 'Inconnue'}</p>
                <p><strong>Engagement:</strong> {professorData.digitalFootprint?.engagementLevel || 'Moyen'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Data Entry Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Ajout Manuel de Données</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className="space-y-3">
                  <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                    <Icon className="w-4 h-4" />
                    <span>{field.label}</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={manualData[field.key as keyof typeof manualData]}
                      onChange={(e) => setManualData(prev => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                    />
                    <div className="absolute bottom-2 right-2">
                      <input
                        type="file"
                        accept=".txt"
                        onChange={(e) => handleFileUpload(field.key, e)}
                        className="hidden"
                        id={`upload-${field.key}`}
                      />
                      <label
                        htmlFor={`upload-${field.key}`}
                        className="cursor-pointer p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Importer depuis un fichier .txt"
                      >
                        <Upload className="w-4 h-4" />
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>Enregistrer</span>
            </button>
          </div>
        </div>
      )}

      {/* Saved Entries */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Entrées Sauvegardées ({savedEntries.length})
        </h3>
        
        {savedEntries.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Database className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>Aucune entrée sauvegardée pour le moment</p>
            <p className="text-sm">Utilisez le bouton "Ajouter Données" pour commencer</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedEntries.map((entry) => (
              <div key={entry.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-slate-900">{entry.professorName}</h4>
                    <p className="text-sm text-slate-500">
                      Sauvegardé le {new Date(entry.timestamp).toLocaleDateString('fr-FR')} à {new Date(entry.timestamp).toLocaleTimeString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => exportData(entry)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Exporter les données"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer l'entrée"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-slate-700 mb-1">Données OSINT</p>
                    <p className="text-slate-600">
                      {entry.osintData ? 'Disponibles' : 'Non disponibles'}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700 mb-1">Données Manuelles</p>
                    <p className="text-slate-600">
                      {Object.values(entry.manualData).filter(Boolean).length} champs remplis
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700 mb-1">Statut</p>
                    <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {entry.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseModule;