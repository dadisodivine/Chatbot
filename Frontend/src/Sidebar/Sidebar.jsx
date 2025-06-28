import './Sidebar.css'
import { 
  ChatIcon, 
  CodeIcon, 
  CreativeIcon, 
  AnalysisIcon
} from '../Chat/Chat';

// Define the new academic icons inline
const MathIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhysicsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BiologyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M21 9H20C18.9 9 18 9.9 18 11V13C18 14.1 18.9 15 20 15H21" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 9H4C5.1 9 6 9.9 6 11V13C6 14.1 5.1 15 4 15H3" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 12H18" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6V22" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ChemistryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2V8L4.5 18C4.22 18.53 4.46 19.16 5 19.44C5.17 19.53 5.36 19.58 5.56 19.58H18.44C19.03 19.58 19.5 19.11 19.5 18.52C19.5 18.32 19.45 18.13 19.36 17.96L15 8V2H9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 6L15 13H9L11.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GeographyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2A15.3 15.3 0 0 1 16 12A15.3 15.3 0 0 1 12 22A15.3 15.3 0 0 1 8 12A15.3 15.3 0 0 1 12 2Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const AccountingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CommerceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ComputerScienceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 7H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 11H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EconomicsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Sidebar = ({ isOpen, onClose, currentMode, onModeChange }) => {
  const modes = [
    { id: 'general', name: 'General Chat', icon: <ChatIcon />, description: 'General purpose assistant' },
    { id: 'code', name: 'Code Helper', icon: <CodeIcon />, description: 'Programming and development' },
    { id: 'creative', name: 'Creative Writing', icon: <CreativeIcon />, description: 'Stories, poems, and creative content' },
    { id: 'analysis', name: 'Data Analysis', icon: <AnalysisIcon />, description: 'Data interpretation and insights' },
    { id: 'math', name: 'Mathematics', icon: <MathIcon />, description: 'Algebra, calculus, statistics, and more' },
    { id: 'physics', name: 'Physics', icon: <PhysicsIcon />, description: 'Mechanics, thermodynamics, quantum physics' },
    { id: 'biology', name: 'Biology', icon: <BiologyIcon />, description: 'Life sciences, anatomy, genetics' },
    { id: 'chemistry', name: 'Chemistry', icon: <ChemistryIcon />, description: 'Organic, inorganic, and physical chemistry' },
    { id: 'geography', name: 'Geography', icon: <GeographyIcon />, description: 'Physical and human geography' },
    { id: 'accounting', name: 'Accounting', icon: <AccountingIcon />, description: 'Financial accounting and bookkeeping' },
    { id: 'commerce', name: 'Commerce', icon: <CommerceIcon />, description: 'Business studies and trade' },
    { id: 'computer-science', name: 'Computer Science', icon: <ComputerScienceIcon />, description: 'Algorithms, data structures, theory' },
    { id: 'economics', name: 'Economics', icon: <EconomicsIcon />, description: 'Micro and macroeconomics principles' }
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