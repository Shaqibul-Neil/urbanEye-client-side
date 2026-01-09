import useEditorMode from "../../hooks/page builder/useEditorMode";

const EditorTopBar = () => {
  const { setEditMode } = useEditorMode();

  return (
    <div className="fixed top-0 left-0 w-full h-14 bg-black text-white z-[10000] flex items-center justify-between px-6">
      <span className="font-bold">Editor Mode</span>

      <div className="flex gap-4">
        <button
          onClick={() => setEditMode(false)}
          className="btn btn-sm btn-error"
        >
          Exit Editor
        </button>
      </div>
    </div>
  );
};
export default EditorTopBar;
