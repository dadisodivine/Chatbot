import './Sidebar.css'
import { ChatIcon, CodeIcon, CreativeIcon, AnalysisIcon } from '../Chat/Chat';

const Sidebar = ({ isOpen, onClose, currentMode, onModeChange }) => {
  const modes = [
    { id: 'general', name: 'General Chat', icon: <ChatIcon />, description: 'General purpose assistant' },
    { id: 'code', name: 'Code Helper', icon: <CodeIcon />, description: 'Programming and development' },
    { id: 'creative', name: 'Creative Writing', icon: <CreativeIcon />, description: 'Stories, poems, and creative content' },
    { id: 'analysis', name: 'Data Analysis', icon: <AnalysisIcon />, description: 'Data interpretation and insights' }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Chat Modes</h2>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>
        
        <div className="sidebar-content">
          {modes.map((mode) => (
            <button
              key={mode.id}
              className={`mode-item ${currentMode === mode.id ? 'active' : ''}`}
              onClick={() => {
                onModeChange(mode.id);
                onClose();
              }}
            >
              <div className="mode-icon">{mode.icon}</div>
              <div className="mode-info">
                <div className="mode-name">{mode.name}</div>
                <div className="mode-description">{mode.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default Sidebar;