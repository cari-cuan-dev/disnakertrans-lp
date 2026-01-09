'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateUserProfile } from '@/lib/actions/user-profile-actions'

export default function CompanyProfileForm({ userId, userProfile }) {
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '',
    website: userProfile.website || '',
    address: userProfile.address || '',
    city: userProfile.city || '',
    business_registration_number: userProfile.business_registration_number || '',
    industrial_sector: userProfile.industrial_sector || '',
    number_of_employees: userProfile.number_of_employees || '',
    description: userProfile.description || '',
    hr_name: userProfile.hr_name || '',
    hr_position: userProfile.hr_position || '',
    hr_phone: userProfile.hr_phone || '',
    hr_email: userProfile.hr_email || '',
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
      const result = await updateUserProfile(userId, formData)
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
          <CardTitle>Informasi Perusahaan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Perusahaan</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business_registration_number">Nomor Induk Perusahaan</Label>
                <Input
                  id="business_registration_number"
                  name="business_registration_number"
                  value={formData.business_registration_number}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Perusahaan</Label>
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
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="https://www.perusahaan.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Alamat Kantor</Label>
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
                <Label htmlFor="industrial_sector">Bidang Industri</Label>
                <Select 
                  value={formData.industrial_sector} 
                  onValueChange={(value) => setFormData({...formData, industrial_sector: value})} 
                  disabled={!editing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bidang industri" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufaktur">Manufaktur</SelectItem>
                    <SelectItem value="teknologi">Teknologi</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="kesehatan">Kesehatan</SelectItem>
                    <SelectItem value="pendidikan">Pendidikan</SelectItem>
                    <SelectItem value="keuangan">Keuangan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number_of_employees">Jumlah Karyawan</Label>
                <Select 
                  value={formData.number_of_employees} 
                  onValueChange={(value) => setFormData({...formData, number_of_employees: value})} 
                  disabled={!editing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jumlah karyawan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50 Karyawan</SelectItem>
                    <SelectItem value="51-200">51-200 Karyawan</SelectItem>
                    <SelectItem value="201-500">201-500 Karyawan</SelectItem>
                    <SelectItem value="500plus">500+ Karyawan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div></div> {/* Empty div for alignment */}
            </div>
            
            <div>
              <Label htmlFor="description">Deskripsi Perusahaan</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={!editing}
                rows={4}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Informasi HR</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hr_name">Nama HR</Label>
                    <Input
                      id="hr_name"
                      name="hr_name"
                      value={formData.hr_name}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hr_position">Posisi HR</Label>
                    <Input
                      id="hr_position"
                      name="hr_position"
                      value={formData.hr_position}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hr_phone">Telepon HR</Label>
                    <Input
                      id="hr_phone"
                      name="hr_phone"
                      value={formData.hr_phone}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hr_email">Email HR</Label>
                    <Input
                      id="hr_email"
                      name="hr_email"
                      type="email"
                      value={formData.hr_email}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
                        website: userProfile.website || '',
                        address: userProfile.address || '',
                        city: userProfile.city || '',
                        business_registration_number: userProfile.business_registration_number || '',
                        industrial_sector: userProfile.industrial_sector || '',
                        number_of_employees: userProfile.number_of_employees || '',
                        description: userProfile.description || '',
                        hr_name: userProfile.hr_name || '',
                        hr_position: userProfile.hr_position || '',
                        hr_phone: userProfile.hr_phone || '',
                        hr_email: userProfile.hr_email || '',
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