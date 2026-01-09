import { useState } from "react";
import { EditModeContext } from "./EditModeContext";
export const EditModeProvider = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const editorValue = {
    editMode,
    setEditMode,
    activeSection,
    setActiveSection,
  };
  return (
    <EditModeContext.Provider value={editorValue}>
      {children}
    </EditModeContext.Provider>
  );
};
