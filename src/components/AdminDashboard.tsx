import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  Search,
  Filter,
  Download,
  Eye,
  School,
  LogOut,
  BarChart3,
  TrendingUp
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [schoolFilter, setSchoolFilter] = useState('all');

  const [applications] = useState([
    {
      id: 'APP001',
      studentName: 'Ahmad Fadhil',
      nisn: '1234567890',
      school: 'SMA Negeri 1 Bandung',
      program: 'IPA',
      status: 'pending',
      submittedAt: '2024-01-15',
      score: 85.5,
      documents: 6,
      totalDocs: 6
    },
    {
      id: 'APP002',
      studentName: 'Siti Nurhaliza',
      nisn: '1234567891',
      school: 'SMA Negeri 1 Bandung',
      program: 'IPS',
      status: 'accepted',
      submittedAt: '2024-01-14',
      score: 88.2,
      documents: 6,
      totalDocs: 6
    },
    {
      id: 'APP003',
      studentName: 'Budi Santoso',
      nisn: '1234567892',
      school: 'SMA Negeri 2 Bandung',
      program: 'IPA',
      status: 'rejected',
      submittedAt: '2024-01-13',
      score: 75.8,
      documents: 5,
      totalDocs: 6
    },
    {
      id: 'APP004',
      studentName: 'Rina Permata',
      nisn: '1234567893',
      school: 'SMA Negeri 1 Bandung',
      program: 'Bahasa',
      status: 'review',
      submittedAt: '2024-01-16',
      score: 82.1,
      documents: 6,
      totalDocs: 6
    }
  ]);

  const [stats] = useState({
    totalApplications: 1250,
    pending: 320,
    accepted: 680,
    rejected: 250,
    acceptanceRate: 54.4
  });

  const schools = ['SMA Negeri 1 Bandung', 'SMA Negeri 2 Bandung', 'SMA Negeri 3 Bandung'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Menunggu</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Diterima</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="w-3 h-3 mr-1" />Ditolak</Badge>;
      case 'review':
        return <Badge variant="outline" className="text-blue-600 border-blue-600"><Eye className="w-3 h-3 mr-1" />Review</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.nisn.includes(searchTerm) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSchool = schoolFilter === 'all' || app.school === schoolFilter;
    
    return matchesSearch && matchesStatus && matchesSchool;
  });

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    // Here you would update the application status
    console.log(`Updating application ${applicationId} to status ${newStatus}`);
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
                <p className="text-sm text-gray-600">Dashboard Admin</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
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
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Admin</h2>
          <p className="text-gray-600 mt-2">Kelola pendaftaran siswa dan proses seleksi</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Pendaftaran</p>
                  <p className="text-2xl font-bold">{stats.totalApplications.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Menunggu Review</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
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
                  <p className="text-2xl font-bold">{stats.accepted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <XCircle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Ditolak</p>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Tingkat Penerimaan</p>
                  <p className="text-2xl font-bold">{stats.acceptanceRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">Manajemen Pendaftaran</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Cari nama siswa, NISN, atau ID aplikasi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="pending">Menunggu</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="accepted">Diterima</SelectItem>
                      <SelectItem value="rejected">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={schoolFilter} onValueChange={setSchoolFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter Sekolah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Sekolah</SelectItem>
                      {schools.map(school => (
                        <SelectItem key={school} value={school}>{school}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Applications Table */}
            <Card>
              <CardHeader>
                <CardTitle>Daftar Pendaftaran</CardTitle>
                <CardDescription>
                  Menampilkan {filteredApplications.length} dari {applications.length} pendaftaran
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama Siswa</TableHead>
                        <TableHead>NISN</TableHead>
                        <TableHead>Sekolah Tujuan</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Nilai</TableHead>
                        <TableHead>Dokumen</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell className="font-mono text-sm">{application.id}</TableCell>
                          <TableCell className="font-medium">{application.studentName}</TableCell>
                          <TableCell>{application.nisn}</TableCell>
                          <TableCell>{application.school}</TableCell>
                          <TableCell>{application.program}</TableCell>
                          <TableCell>{application.score}</TableCell>
                          <TableCell>
                            <span className={`text-sm ${
                              application.documents === application.totalDocs 
                                ? 'text-green-600' 
                                : 'text-yellow-600'
                            }`}>
                              {application.documents}/{application.totalDocs}
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(application.status)}</TableCell>
                          <TableCell>{new Date(application.submittedAt).toLocaleDateString('id-ID')}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Select onValueChange={(value) => handleStatusChange(application.id, value)}>
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Ubah Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Menunggu</SelectItem>
                                  <SelectItem value="review">Review</SelectItem>
                                  <SelectItem value="accepted">Terima</SelectItem>
                                  <SelectItem value="rejected">Tolak</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Laporan Pendaftaran per Sekolah</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schools.map((school) => {
                      const schoolApps = applications.filter(app => app.school === school);
                      const accepted = schoolApps.filter(app => app.status === 'accepted').length;
                      const total = schoolApps.length;
                      const percentage = total > 0 ? (accepted / total) * 100 : 0;
                      
                      return (
                        <div key={school} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{school}</h4>
                            <span className="text-sm text-gray-600">{accepted}/{total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{percentage.toFixed(1)}% diterima</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistik Pendaftaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{stats.totalApplications}</div>
                        <div className="text-sm text-gray-600">Total Aplikasi</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
                        <div className="text-sm text-gray-600">Diterima</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Program IPA</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Program IPS</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Program Bahasa</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Sistem</CardTitle>
                <CardDescription>Konfigurasi sistem PPDB</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Periode Pendaftaran</h4>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Tanggal Mulai</label>
                      <Input type="date" defaultValue="2024-01-01" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Tanggal Selesai</label>
                      <Input type="date" defaultValue="2024-03-31" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Kuota Penerimaan</h4>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Kuota Total</label>
                      <Input type="number" defaultValue="1500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Kuota per Sekolah</label>
                      <Input type="number" defaultValue="300" />
                    </div>
                  </div>
                </div>
                
                <Button>Simpan Pengaturan</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}