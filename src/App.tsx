import { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ApplicationForm } from './components/ApplicationForm';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  phone?: string;
  isLoggedIn: boolean;
};

type AppView = 'auth' | 'student-dashboard' | 'admin-dashboard' | 'application-form';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('auth');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'admin') {
      setCurrentView('admin-dashboard');
      toast.success(`Selamat datang, ${userData.name}!`);
    } else {
      setCurrentView('student-dashboard');
      toast.success(`Selamat datang, ${userData.name}!`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('auth');
    toast.info('Anda telah keluar dari sistem');
  };

  const handleStartApplication = () => {
    setCurrentView('application-form');
  };

  const handleApplicationSubmit = (formData: any) => {
    // Simulate form submission
    console.log('Application submitted:', formData);
    toast.success('Pendaftaran berhasil dikirim! Anda akan mendapat notifikasi hasil seleksi.');
    setCurrentView('student-dashboard');
  };

  const handleBackToDashboard = () => {
    if (user?.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('student-dashboard');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'auth':
        return <AuthPage onLogin={handleLogin} />;
      
      case 'student-dashboard':
        return (
          <StudentDashboard
            user={user!}
            onLogout={handleLogout}
            onStartApplication={handleStartApplication}
          />
        );
      
      case 'admin-dashboard':
        return (
          <AdminDashboard
            user={user!}
            onLogout={handleLogout}
          />
        );
      
      case 'application-form':
        return (
          <ApplicationForm
            onBack={handleBackToDashboard}
            onSubmit={handleApplicationSubmit}
          />
        );
      
      default:
        return <AuthPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
      <Toaster position="top-right" />
    </div>
  );
}