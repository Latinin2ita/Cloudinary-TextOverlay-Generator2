import React, { useState } from 'react';
import LeftSideBar from './LeftSideBar';
import Playground from './Playground';

const uwConfig = {
    cloudName: "dxebuolgg",
    uploadPreset: "Pills of Wisdom",
    sources: ["local"],
    multiple: false,
    tags: ["text-overlay"],
  };

export interface Settings {
  text: string;
  fontFamily: string;
  color: string;
  fontSize: number;
  rotation?: number;
  x: number;
  y: number;
  image: string | null;
}

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    text: 'Cloudinary',
    fontFamily: 'Arial',
    color: '#000000',
    fontSize: 30,
    x: 0,
    y: 0,
    image: null,
  });

  const [image, setImage] = useState('')

  const updateSettings = (updated: Partial<Settings>) => {
    setSettings((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  return (
    <div className="flex">
      <LeftSideBar settings={settings} updateSettings={updateSettings} setImage={setImage} />
      <Playground settings={settings} image={image}/>
    </div>
  );
};

export default App;
