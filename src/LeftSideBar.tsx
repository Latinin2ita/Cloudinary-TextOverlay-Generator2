import React, { ChangeEvent } from 'react';
import { Settings } from './App';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';


interface LeftSideBarProps {
  settings: Settings;
  updateSettings: (updated: Partial<Settings>) => void;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ settings, updateSettings, setImage }) => {
  // Handlers for the various inputs
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSettings({ text: e.target.value });
  };

  const handleFontChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ fontFamily: e.target.value });
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSettings({ color: e.target.value });
  };

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSettings({ fontSize: parseInt(e.target.value, 10) });
  };

  const handleXChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSettings({ x: parseInt(e.target.value, 10) });
  };

  const handleYChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSettings({ y: parseInt(e.target.value, 10) });
  };

  return (
    <div className="h-screen w-72 p-5 border-r border-gray-300">
      <h2 className="text-xl font-bold mb-4">Background Text</h2>
      <div className="mb-3">
        <label className="block text-sm font-medium">Text:</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={settings.text}
          onChange={handleTextChange}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Font Family:</label>
        <select
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={settings.fontFamily}
          onChange={handleFontChange}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Color:</label>
        <input
          type="color"
          className="w-full h-10"
          value={settings.color}
          onChange={handleColorChange}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Font Size (px):</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={settings.fontSize}
          onChange={handleFontSizeChange}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">X Position (px):</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={settings.x}
          onChange={handleXChange}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Y Position (px):</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={settings.y}
          onChange={handleYChange}
        />
      </div>
      <div className="mb-3">
        <CloudinaryUploadWidget setImage={setImage} />
      </div>
    </div>
  );
};

export default LeftSideBar;
