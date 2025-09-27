import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Home, 
  GraduationCap, 
  FileText,
  Upload,
  Check
} from 'lucide-react';

interface ApplicationFormProps {
  onBack: () => void;
  onSubmit: (formData: any) => void;
}

export function ApplicationForm({ onBack, onSubmit }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    nisn: '',
    birthPlace: '',
    birthDate: '',
    gender: '',
    religion: '',
    phone: '',
    email: '',
    address: '',
    
    // Parent Information
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    parentPhone: '',
    familyIncome: '',
    
    // Education Information
    previousSchool: '',
    graduationYear: '',
    certificate: '',
    averageGrade: '',
    achievements: '',
    
    // School Preferences
    firstChoice: '',
    firstChoiceProgram: '',
    secondChoice: '',
    secondChoiceProgram: '',
    thirdChoice: '',
    thirdChoiceProgram: '',
    
    // Documents
    documents: {}
  });

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: 'Data Pribadi', icon: User },
    { id: 2, title: 'Data Orang Tua', icon: Home },
    { id: 3, title: 'Data Pendidikan', icon: GraduationCap },
    { id: 4, title: 'Pilihan Sekolah', icon: FileText }
  ];

  const schools = [
    'SMA Negeri 1 Bandung',
    'SMA Negeri 2 Bandung', 
    'SMA Negeri 3 Bandung',
    'SMA Negeri 4 Bandung',
    'SMA Negeri 5 Bandung'
  ];

  const programs = ['IPA', 'IPS', 'Bahasa'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Data Pribadi Siswa</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nisn">NISN *</Label>
                <Input
                  id="nisn"
                  value={formData.nisn}
                  onChange={(e) => handleInputChange('nisn', e.target.value)}
                  placeholder="10 digit NISN"
                  maxLength={10}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthPlace">Tempat Lahir *</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                  placeholder="Kota kelahiran"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Jenis Kelamin *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Laki-laki</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Perempuan</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="religion">Agama *</Label>
                <Select value={formData.religion} onValueChange={(value) => handleInputChange('religion', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih agama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="islam">Islam</SelectItem>
                    <SelectItem value="kristen">Kristen</SelectItem>
                    <SelectItem value="katolik">Katolik</SelectItem>
                    <SelectItem value="hindu">Hindu</SelectItem>
                    <SelectItem value="buddha">Buddha</SelectItem>
                    <SelectItem value="konghucu">Konghucu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="contoh@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Lengkap *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Masukkan alamat lengkap"
                rows={3}
                required
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Data Orang Tua/Wali</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fatherName">Nama Ayah *</Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  placeholder="Nama lengkap ayah"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fatherOccupation">Pekerjaan Ayah *</Label>
                <Input
                  id="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                  placeholder="Pekerjaan ayah"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="motherName">Nama Ibu *</Label>
                <Input
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  placeholder="Nama lengkap ibu"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="motherOccupation">Pekerjaan Ibu *</Label>
                <Input
                  id="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                  placeholder="Pekerjaan ibu"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Nomor Telepon Orang Tua *</Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="familyIncome">Penghasilan Keluarga per Bulan *</Label>
                <Select value={formData.familyIncome} onValueChange={(value) => handleInputChange('familyIncome', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih range penghasilan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="< 1jt">Kurang dari Rp 1.000.000</SelectItem>
                    <SelectItem value="1-2jt">Rp 1.000.000 - Rp 2.000.000</SelectItem>
                    <SelectItem value="2-5jt">Rp 2.000.000 - Rp 5.000.000</SelectItem>
                    <SelectItem value="5-10jt">Rp 5.000.000 - Rp 10.000.000</SelectItem>
                    <SelectItem value="> 10jt">Lebih dari Rp 10.000.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Data Pendidikan Sebelumnya</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="previousSchool">Asal Sekolah *</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                  placeholder="Nama SMP/MTs asal"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Tahun Lulus *</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  placeholder="2024"
                  min="2020"
                  max="2025"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="certificate">Nomor Ijazah/SKL *</Label>
                <Input
                  id="certificate"
                  value={formData.certificate}
                  onChange={(e) => handleInputChange('certificate', e.target.value)}
                  placeholder="Nomor ijazah atau SKL"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="averageGrade">Rata-rata Nilai UN/Rapor *</Label>
                <Input
                  id="averageGrade"
                  type="number"
                  step="0.01"
                  value={formData.averageGrade}
                  onChange={(e) => handleInputChange('averageGrade', e.target.value)}
                  placeholder="85.50"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="achievements">Prestasi yang Pernah Diraih</Label>
              <Textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) => handleInputChange('achievements', e.target.value)}
                placeholder="Tuliskan prestasi akademik/non-akademik yang pernah diraih (opsional)"
                rows={3}
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Pilihan Sekolah</h3>
            <p className="text-sm text-gray-600">Pilih hingga 3 sekolah sesuai urutan prioritas Anda</p>
            
            <div className="space-y-6">
              {/* Pilihan 1 */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-base">Pilihan Pertama *</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sekolah</Label>
                      <Select value={formData.firstChoice} onValueChange={(value) => handleInputChange('firstChoice', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih sekolah" />
                        </SelectTrigger>
                        <SelectContent>
                          {schools.map((school) => (
                            <SelectItem key={school} value={school}>{school}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Program Studi</Label>
                      <Select value={formData.firstChoiceProgram} onValueChange={(value) => handleInputChange('firstChoiceProgram', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program} value={program}>{program}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Pilihan 2 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Pilihan Kedua</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sekolah</Label>
                      <Select value={formData.secondChoice} onValueChange={(value) => handleInputChange('secondChoice', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih sekolah" />
                        </SelectTrigger>
                        <SelectContent>
                          {schools.map((school) => (
                            <SelectItem key={school} value={school}>{school}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Program Studi</Label>
                      <Select value={formData.secondChoiceProgram} onValueChange={(value) => handleInputChange('secondChoiceProgram', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program} value={program}>{program}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Pilihan 3 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Pilihan Ketiga</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Sekolah</Label>
                      <Select value={formData.thirdChoice} onValueChange={(value) => handleInputChange('thirdChoice', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih sekolah" />
                        </SelectTrigger>
                        <SelectContent>
                          {schools.map((school) => (
                            <SelectItem key={school} value={school}>{school}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Program Studi</Label>
                      <Select value={formData.thirdChoiceProgram} onValueChange={(value) => handleInputChange('thirdChoiceProgram', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program} value={program}>{program}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                Saya menyatakan bahwa data yang saya masukkan adalah benar dan dapat dipertanggungjawabkan
              </Label>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">Formulir Pendaftaran</h1>
          <p className="text-gray-600 mt-2">Lengkapi semua data dengan benar</p>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Progress Pendaftaran</h3>
              <span className="text-sm text-gray-600">{currentStep} dari {totalSteps} langkah</span>
            </div>
            <Progress value={progressPercentage} className="mb-4" />
            
            <div className="flex justify-between">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                
                return (
                  <div key={step.id} className="flex flex-col items-center space-y-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs text-center ${
                      isActive ? 'text-blue-600 font-medium' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>
          
          {currentStep === totalSteps ? (
            <Button onClick={handleSubmit}>
              <Check className="w-4 h-4 mr-2" />
              Kirim Pendaftaran
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Selanjutnya
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}