import { createContext, useContext, useState } from 'react';

const SceneContext = createContext();

export function SceneProvider({ children }) {
  const [activeScene, setActiveScene] = useState(null);

  return (
    <SceneContext.Provider
      value={{
        activeScene,
        setActiveScene,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  return useContext(SceneContext);
}