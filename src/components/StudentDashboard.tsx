import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Upload, 
  User, 
  School,
  Calendar,
  Bell,
  LogOut
} from 'lucide-react';

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
  onStartApplication: () => void;
}

export function StudentDashboard({ user, onLogout, onStartApplication }: StudentDashboardProps) {
  const [applications] = useState([
    {
      id: '1',
      schoolName: 'SMA Negeri 1 Bandung',
      program: 'IPA',
      status: 'pending',
      submittedAt: '2024-01-15',
      documents: {
        completed: 4,
        total: 6
      }
    },
    {
      id: '2',
      schoolName: 'SMA Negeri 3 Bandung',
      program: 'IPS',
      status: 'accepted',
      submittedAt: '2024-01-14',
      documents: {
        completed: 6,
        total: 6
      }
    }
  ]);

  const [notifications] = useState([
    {
      id: '1',
      title: 'Dokumen Diperlukan',
      message: 'Lengkapi dokumen untuk SMA Negeri 1 Bandung',
      time: '2 jam yang lalu',
      type: 'warning'
    },
    {
      id: '2',
      title: 'Pendaftaran Diterima',
      message: 'Selamat! Anda diterima di SMA Negeri 3 Bandung',
      time: '1 hari yang lalu',
      type: 'success'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Menunggu</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Diterima</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />Ditolak</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const calculateProgress = () => {
    const totalApps = applications.length;
    const completedApps = applications.filter(app => app.status !== 'pending').length;
    return totalApps > 0 ? (completedApps / totalApps) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <School className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold">PPDB Jawa Barat</h1>
                <p className="text-sm text-gray-600">Dashboard Siswa</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Selamat Datang, {user.name}</h2>
          <p className="text-gray-600 mt-2">Kelola pendaftaran sekolah Anda dengan mudah</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Pendaftaran</p>
                  <p className="text-2xl font-bold">{applications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Menunggu</p>
                  <p className="text-2xl font-bold">{applications.filter(app => app.status === 'pending').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Diterima</p>
                  <p className="text-2xl font-bold">{applications.filter(app => app.status === 'accepted').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="text-blue-600 text-sm font-bold">{Math.round(calculateProgress())}%</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Progress</p>
                  <Progress value={calculateProgress()} className="w-16 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">Pendaftaran Saya</TabsTrigger>
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            <TabsTrigger value="documents">Dokumen</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Pendaftaran Sekolah</h3>
              <Button onClick={onStartApplication}>
                <FileText className="w-4 h-4 mr-2" />
                Daftar Sekolah Baru
              </Button>
            </div>

            <div className="grid gap-6">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{application.schoolName}</CardTitle>
                        <CardDescription>
                          Program: {application.program} • Dikirim: {new Date(application.submittedAt).toLocaleDateString('id-ID')}
                        </CardDescription>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          Dokumen: {application.documents.completed}/{application.documents.total} lengkap
                        </p>
                        <Progress 
                          value={(application.documents.completed / application.documents.total) * 100} 
                          className="w-48"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Detail
                        </Button>
                        {application.status === 'pending' && (
                          <Button size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Dokumen
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <h3 className="text-xl font-semibold">Notifikasi</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'success' ? 'bg-green-500' : 
                        notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <h3 className="text-xl font-semibold">Dokumen Persyaratan</h3>
            <div className="grid gap-4">
              {[
                { name: 'Ijazah SMP/MTs', status: 'uploaded', required: true },
                { name: 'Kartu Keluarga', status: 'uploaded', required: true },
                { name: 'Akta Kelahiran', status: 'uploaded', required: true },
                { name: 'Rapor Semester 1-5', status: 'pending', required: true },
                { name: 'Surat Keterangan Prestasi', status: 'pending', required: false },
                { name: 'Surat Keterangan Tidak Mampu', status: 'not_uploaded', required: false }
              ].map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-600">
                            {doc.required ? 'Wajib' : 'Opsional'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {doc.status === 'uploaded' && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Terupload
                          </Badge>
                        )}
                        {doc.status === 'pending' && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            <Clock className="w-3 h-3 mr-1" />
                            Menunggu
                          </Badge>
                        )}
                        {doc.status === 'not_uploaded' && (
                          <Badge variant="outline" className="text-gray-600 border-gray-600">
                            Belum Upload
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}