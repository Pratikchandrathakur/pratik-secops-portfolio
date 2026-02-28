import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Project, Certification, Experience, Category } from '../types';
import { Trash2, Pencil, Plus, Save, X, LogOut, Shield, Database, LayoutDashboard, RefreshCw } from 'lucide-react';
import { useTheme } from './ThemeContext';

const AdminDashboard: React.FC = () => {
  const { 
    projects, addProject, updateProject, deleteProject,
    certifications, addCertification, updateCertification, deleteCertification,
    experience, addExperience, updateExperience, deleteExperience,
    resetData
  } = useData();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'certs' | 'experience'>('projects');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied');
    }
  };

  const openModal = (mode: 'add' | 'edit', item?: any) => {
    setModalMode(mode);
    if (mode === 'edit' && item) {
      setEditingItem(item);
    } else {
      // Default empty templates
      if (activeTab === 'projects') {
        setEditingItem({ id: `proj-${Date.now()}`, title: '', description: '', techStack: [], status: 'In Development' });
      } else if (activeTab === 'certs') {
        setEditingItem({ id: `cert-${Date.now()}`, name: '', issuer: '', date: '', category: Category.SECURITY });
      } else {
        setEditingItem({ id: `exp-${Date.now()}`, role: '', company: '', period: '', description: [], skills: [] });
      }
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (activeTab === 'projects') {
      modalMode === 'add' ? addProject(editingItem) : updateProject(editingItem);
    } else if (activeTab === 'certs') {
      modalMode === 'add' ? addCertification(editingItem) : updateCertification(editingItem);
    } else {
      modalMode === 'add' ? addExperience(editingItem) : updateExperience(editingItem);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Confirm deletion? This action cannot be undone.')) {
      if (activeTab === 'projects') deleteProject(id);
      else if (activeTab === 'certs') deleteCertification(id);
      else deleteExperience(id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-primary-500/30">
              <Shield className="w-8 h-8 text-primary-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-100 mb-2">Restricted Area</h2>
          <p className="text-center text-slate-500 mb-8 font-mono text-sm">C2 DASHBOARD ACCESS CONTROL</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:border-primary-500 outline-none font-mono"
                placeholder="Enter access code..."
              />
            </div>
            <button className="w-full bg-primary-600 hover:bg-primary-500 text-white py-2 rounded font-bold transition-colors">
              AUTHENTICATE
            </button>
            <div className="text-center text-xs text-slate-600 mt-4">
              Hint: admin
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Top Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary-500" />
          <span className="font-bold tracking-tight">C2 ADMIN DASHBOARD</span>
          <span className="text-xs bg-primary-500/10 text-primary-400 px-2 py-0.5 rounded border border-primary-500/20 animate-pulse">ONLINE</span>
        </div>
        <div className="flex gap-3">
          <a href="/" className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-2 transition-colors">
            <LayoutDashboard className="w-4 h-4" /> View Site
          </a>
          <button onClick={resetData} className="px-3 py-1.5 text-sm bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-900 rounded flex items-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" /> Factory Reset
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-2 transition-colors text-slate-300">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-900/50 border-r border-slate-800 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <SidebarItem 
            active={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')} 
            icon={<Database className="w-4 h-4" />} 
            label="Projects" 
          />
          <SidebarItem 
            active={activeTab === 'certs'} 
            onClick={() => setActiveTab('certs')} 
            icon={<Shield className="w-4 h-4" />} 
            label="Certifications" 
          />
          <SidebarItem 
            active={activeTab === 'experience'} 
            onClick={() => setActiveTab('experience')} 
            icon={<LayoutDashboard className="w-4 h-4" />} 
            label="Experience" 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold capitalize">{activeTab} Management</h1>
            <button 
              onClick={() => openModal('add')}
              className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-xs text-slate-400 uppercase font-mono">
                    <th className="p-4">Name/Role</th>
                    <th className="p-4">Details</th>
                    <th className="p-4 w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab === 'projects' && projects.map((p) => (
                    <TableRow 
                      key={p.id} 
                      title={p.title} 
                      subtitle={p.status} 
                      onEdit={() => openModal('edit', p)} 
                      onDelete={() => handleDelete(p.id)} 
                    />
                  ))}
                  {activeTab === 'certs' && certifications.map((c) => (
                    <TableRow 
                      key={c.id} 
                      title={c.name} 
                      subtitle={`${c.issuer} | ${c.category}`} 
                      onEdit={() => openModal('edit', c)} 
                      onDelete={() => handleDelete(c.id)} 
                    />
                  ))}
                  {activeTab === 'experience' && experience.map((e) => (
                    <TableRow 
                      key={e.id} 
                      title={e.role} 
                      subtitle={`${e.company} (${e.period})`} 
                      onEdit={() => openModal('edit', e)} 
                      onDelete={() => handleDelete(e.id)} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {((activeTab === 'projects' && projects.length === 0) || 
              (activeTab === 'certs' && certifications.length === 0) || 
              (activeTab === 'experience' && experience.length === 0)) && (
                <div className="p-8 text-center text-slate-500">No data found in this category.</div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-slate-800 sticky top-0 bg-slate-900">
              <h3 className="text-lg font-bold flex items-center gap-2">
                {modalMode === 'add' ? <Plus className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                {modalMode === 'add' ? 'Create New' : 'Edit'} {activeTab.slice(0, -1)}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Dynamic Form Fields based on Type */}
              {activeTab === 'projects' && (
                <>
                  <Input label="Title" value={editingItem.title} onChange={v => setEditingItem({...editingItem, title: v})} />
                  <Input label="Status" value={editingItem.status} onChange={v => setEditingItem({...editingItem, status: v})} placeholder="In Development, Completed, etc." />
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                    <textarea 
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:border-primary-500 outline-none min-h-[100px]"
                    />
                  </div>
                  <Input label="Tech Stack (comma separated)" value={editingItem.techStack.join(', ')} onChange={v => setEditingItem({...editingItem, techStack: v.split(',').map((s: string) => s.trim())})} />
                  <Input label="Repo URL" value={editingItem.repoUrl || ''} onChange={v => setEditingItem({...editingItem, repoUrl: v})} />
                  <Input label="Demo URL" value={editingItem.demoUrl || ''} onChange={v => setEditingItem({...editingItem, demoUrl: v})} />
                </>
              )}

              {activeTab === 'certs' && (
                <>
                  <Input label="Certification Name" value={editingItem.name} onChange={v => setEditingItem({...editingItem, name: v})} />
                  <Input label="Issuer" value={editingItem.issuer} onChange={v => setEditingItem({...editingItem, issuer: v})} />
                  <Input label="Date Issued" value={editingItem.date} onChange={v => setEditingItem({...editingItem, date: v})} />
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Category</label>
                    <select 
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:border-primary-500 outline-none"
                    >
                      {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <Input label="Credential ID (Optional)" value={editingItem.credentialId || ''} onChange={v => setEditingItem({...editingItem, credentialId: v})} />
                </>
              )}

              {activeTab === 'experience' && (
                 <>
                   <Input label="Role/Title" value={editingItem.role} onChange={v => setEditingItem({...editingItem, role: v})} />
                   <Input label="Company" value={editingItem.company} onChange={v => setEditingItem({...editingItem, company: v})} />
                   <Input label="Period" value={editingItem.period} onChange={v => setEditingItem({...editingItem, period: v})} />
                   <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Description Points (One per line)</label>
                    <textarea 
                      value={editingItem.description.join('\n')}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value.split('\n')})}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:border-primary-500 outline-none min-h-[120px]"
                    />
                  </div>
                   <Input label="Skills Used (comma separated)" value={editingItem.skills.join(', ')} onChange={v => setEditingItem({...editingItem, skills: v.split(',').map((s: string) => s.trim())})} />
                 </>
              )}
            </div>

            <div className="p-4 border-t border-slate-800 flex justify-end gap-3 sticky bottom-0 bg-slate-900">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleSave} className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded font-bold flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const SidebarItem = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all w-full text-left ${
      active ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    {icon}
    <span className="font-mono text-sm">{label}</span>
  </button>
);

const TableRow = ({ title, subtitle, onEdit, onDelete }: any) => (
  <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
    <td className="p-4">
      <div className="font-bold text-slate-200">{title}</div>
    </td>
    <td className="p-4">
      <div className="text-sm text-slate-400">{subtitle}</div>
    </td>
    <td className="p-4">
      <div className="flex gap-2">
        <button onClick={onEdit} className="p-2 bg-slate-800 hover:bg-primary-500/20 hover:text-primary-400 rounded text-slate-400 transition-colors">
          <Pencil className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="p-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 rounded text-slate-400 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
);

const Input = ({ label, value, onChange, placeholder }: any) => (
  <div>
    <label className="block text-xs font-mono text-slate-400 mb-1">{label}</label>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:border-primary-500 outline-none"
      placeholder={placeholder}
    />
  </div>
);

export default AdminDashboard;