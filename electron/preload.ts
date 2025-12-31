import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  saveProject: (filePath: string, data: unknown) =>
  ipcRenderer.invoke('save-project', { filePath, data }),
  
  loadProject: (filePath: string) =>
  ipcRenderer.invoke('load-project', filePath),
  
  showSaveDialog: () =>
  ipcRenderer.invoke('show-save-dialog'),
  
  showOpenDialog: () =>
    ipcRenderer.invoke('show-open-dialog'),
  
  listRecentProjects: () =>
    ipcRenderer.invoke('list-recent-projects'),
  
  showSaveImageDialog: () =>
    ipcRenderer.invoke('show-save-image-dialog'),
  
  saveImage: (filePath: string, imageData: string) =>
    ipcRenderer.invoke('save-image', { filePath, imageData }),
})

