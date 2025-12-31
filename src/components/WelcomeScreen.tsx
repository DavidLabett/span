import { useEffect, useState } from 'react';
import '../styles/WelcomeScreen.css';

interface WelcomeScreenProps {
  onNewProject: () => void;
  onOpenProject: (filePath: string) => void;
}

export function WelcomeScreen({ onNewProject, onOpenProject }: WelcomeScreenProps) {
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentProjects();
  }, []);

  const loadRecentProjects = async () => {
    try {
      const projects = await window.electronAPI.listRecentProjects();
      setRecentProjects(projects);
    } catch (error) {
      console.error('Failed to load recent projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        {/* Large "span" title */}
        <h1 className="welcome-title">&lt;span&gt;</h1>
        
        {/* Recent Projects Section */}
        <div className="recent-projects">
          <div className="recent-projects-header">
            <h2 className="recent-projects-title">Recent Projects</h2>
            <button 
              className="new-project-button"
              onClick={onNewProject}
            >
              New Project
            </button>
          </div>
          
          {loading ? (
            <div className="loading-state">Loading...</div>
          ) : recentProjects.length === 0 ? (
            <div className="empty-state">
              <p>No recent projects</p>
              <button 
                className="new-project-button"
                onClick={onNewProject}
              >
                Start with a new project
              </button>
            </div>
          ) : (
            <ul className="project-list">
              {recentProjects.map((project) => (
                <li 
                  key={project.filePath}
                  className="project-item"
                  onClick={() => onOpenProject(project.filePath)}
                >
                  <div className="project-name">{project.name}</div>
                  <div className="project-meta">
                    Modified {formatDate(project.modified)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h1 className="welcome-title">&lt;span/&gt;</h1>
      </div>
    </div>
  );
}