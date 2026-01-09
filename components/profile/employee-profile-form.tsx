'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateUserProfile } from '@/lib/actions/user-profile-actions'

export default function EmployeeProfileForm({ userId, userProfile }) {
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '',
    birth_date: userProfile.birth_date || '',
    city: userProfile.city || '',
    address: userProfile.address || '',
    skill: userProfile.skill || '',
    skills: Array.isArray(userProfile.skills) ? userProfile.skills.join(', ') : userProfile.skills || '',
    experience: userProfile.experience || '',
    education: userProfile.education || '',
    languages: Array.isArray(userProfile.languages) ? userProfile.languages.join(', ') : userProfile.languages || '',
    description: userProfile.description || '',
    certifications: Array.isArray(userProfile.certifications) ? userProfile.certifications.join(', ') : userProfile.certifications || '',
  })
  
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    
    try {
      // Ubah skills dan languages ke format JSON string
      const updatedData = {
        ...formData,
        skills: JSON.stringify(formData.skills.split(',').map(s => s.trim()).filter(s => s)),
        languages: JSON.stringify(formData.languages.split(',').map(l => l.trim()).filter(l => l)),
        certifications: JSON.stringify(formData.certifications.split(',').map(c => c.trim()).filter(c => c)),
      }
      
      const result = await updateUserProfile(userId, updatedData)
      setMessage(result.message)
      setEditing(false)
    } catch (error) {
      setMessage('Gagal menyimpan perubahan: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telepon</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div>
                <Label htmlFor="birth_date">Tanggal Lahir</Label>
                <Input
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Kota</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div>
                <Label htmlFor="education">Pendidikan</Label>
                <Select 
                  value={formData.education} 
                  onValueChange={(value) => setFormData({...formData, education: value})} 
                  disabled={!editing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pendidikan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sma">SMA/SMK</SelectItem>
                    <SelectItem value="diploma">Diploma (D3)</SelectItem>
                    <SelectItem value="sarjana">Sarjana (S1)</SelectItem>
                    <SelectItem value="master">Master (S2)</SelectItem>
                    <SelectItem value="doktor">Doktor (S3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">Pengalaman Kerja</Label>
                <Select 
                  value={formData.experience} 
                  onValueChange={(value) => setFormData({...formData, experience: value})} 
                  disabled={!editing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pengalaman" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresh">Fresh Graduate</SelectItem>
                    <SelectItem value="1-2">1-2 Tahun</SelectItem>
                    <SelectItem value="3-5">3-5 Tahun</SelectItem>
                    <SelectItem value="5plus">5+ Tahun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="skill">Keahlian Spesifik</Label>
                <Input
                  id="skill"
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="skills">Keahlian Umum (dipisahkan koma)</Label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Web Development, Desain Grafis, Manajemen Proyek"
              />
            </div>
            
            <div>
              <Label htmlFor="languages">Bahasa (dipisahkan koma)</Label>
              <Input
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Indonesia, Inggris, Mandarin"
              />
            </div>
            
            <div>
              <Label htmlFor="certifications">Sertifikasi (dipisahkan koma)</Label>
              <Input
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Sertifikasi PM, Sertifikasi IT, dll"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Deskripsi Diri</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={!editing}
                rows={4}
              />
            </div>
            
            {message && (
              <div className={`p-3 rounded-lg ${message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              {!editing ? (
                <Button type="button" onClick={() => setEditing(true)}>
                  Edit Profil
                </Button>
              ) : (
                <>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setEditing(false)
                      // Reset form ke data asli
                      setFormData({
                        name: userProfile.name || '',
                        email: userProfile.email || '',
                        phone: userProfile.phone || '',
                        birth_date: userProfile.birth_date || '',
                        city: userProfile.city || '',
                        address: userProfile.address || '',
                        skill: userProfile.skill || '',
                        skills: Array.isArray(userProfile.skills) ? userProfile.skills.join(', ') : userProfile.skills || '',
                        experience: userProfile.experience || '',
                        education: userProfile.education || '',
                        languages: Array.isArray(userProfile.languages) ? userProfile.languages.join(', ') : userProfile.languages || '',
                        description: userProfile.description || '',
                        certifications: Array.isArray(userProfile.certifications) ? userProfile.certifications.join(', ') : userProfile.certifications || '',
                      })
                    }}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}