import { useContext } from "react";
import { EditModeContext } from "../../context/EditModeContext";

const useEditorMode = () => {
  const editorInfo = useContext(EditModeContext);
  return editorInfo;
};
export default useEditorMode;
