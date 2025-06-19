import React from 'react';
import { Monitor, Thermometer, Plus } from 'lucide-react';

const TicMaterialSection = ({
  t,
  ticMaterials,
  newTask,
  setNewTask,
  handleTicMaterialChange,
  addTicMaterial,
  removeTicMaterial
}) => {
  return (
    <div className="mb-6">
      <div className="bg-indigo-800 rounded-lg p-3 sm:p-4 border border-indigo-600">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm sm:text-base text-white">
            {t('classroomAssignment.ticMaterial')}
            <span className="text-red-400 ml-1">*</span>
          </h4>
          <button
            type="button"
            className="text-indigo-300 text-xs sm:text-sm hover:text-white underline transition-colors"
          >
            {t('classroomAssignment.view')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <label className={`flex items-center p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            ticMaterials.videobeam ? 'bg-indigo-600 ring-2 ring-indigo-400' : 'bg-indigo-700 hover:bg-indigo-600'
          }`}>
            <input 
              type="checkbox" 
              checked={ticMaterials.videobeam} 
              onChange={(e) => handleTicMaterialChange('videobeam', e.target.checked)} 
              className="mr-2 sm:mr-3 w-4 h-4 bg-indigo-600 border-indigo-500 text-indigo-200 rounded focus:ring-indigo-500" 
            />
            <Monitor className="w-4 h-4 mr-2 text-indigo-300" />
            <span className="text-xs sm:text-sm font-medium text-white">{t('classroomAssignment.videobeam')}</span>
          </label>
          <label className={`flex items-center p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            ticMaterials.airConditioning ? 'bg-indigo-600 ring-2 ring-indigo-400' : 'bg-indigo-700 hover:bg-indigo-600'
          }`}>
            <input 
              type="checkbox" 
              checked={ticMaterials.airConditioning} 
              onChange={(e) => handleTicMaterialChange('airConditioning', e.target.checked)} 
              className="mr-2 sm:mr-3 w-4 h-4 bg-indigo-600 border-indigo-500 text-indigo-200 rounded focus:ring-indigo-500" 
            />
            <Thermometer className="w-4 h-4 mr-2 text-indigo-300" />
            <span className="text-xs sm:text-sm font-medium text-white">{t('classroomAssignment.airConditioning')}</span>
          </label>
        </div>

        {ticMaterials.customMaterials.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-indigo-300 mb-2">Materiales personalizados:</p>
            <div className="flex flex-wrap gap-2">
              {ticMaterials.customMaterials.map((material, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-indigo-600 text-white text-xs rounded-full"
                >
                  {material}
                  <button
                    type="button"
                    onClick={() => removeTicMaterial(material)}
                    className="ml-1 text-indigo-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            placeholder={t('classroomAssignment.enterNewTask')} 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && addTicMaterial()}
            className="flex-1 h-10 px-3 py-2 border border-indigo-600 bg-indigo-700 text-white placeholder-indigo-400 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
            maxLength={50}
          />
          <button 
            type="button" 
            onClick={addTicMaterial} 
            disabled={!newTask.trim()}
            className="px-4 h-10 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            {t('classroomAssignment.addItem')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicMaterialSection;
