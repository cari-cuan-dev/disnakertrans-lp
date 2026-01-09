'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { getCompanyVacancies, createVacancy, updateVacancy, deleteVacancy } from '@/lib/actions/vacancy-actions'

export default function CompanyVacanciesTab({ companyId }) {
  const [vacancies, setVacancies] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingVacancy, setEditingVacancy] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    salary_start: '',
    salary_end: '',
    type: '',
    description: '',
    benefits: '',
  })

  useEffect(() => {
    fetchVacancies()
  }, [companyId])

  const fetchVacancies = async () => {
    try {
      setLoading(true)
      const vacanciesData = await getCompanyVacancies(companyId)
      setVacancies(vacanciesData)
    } catch (error) {
      console.error('Error fetching vacancies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingVacancy) {
        // Update existing vacancy
        await updateVacancy(editingVacancy.id, { ...formData, company_id: companyId })
      } else {
        // Create new vacancy
        await createVacancy({ ...formData, company_id: companyId })
      }
      
      // Refresh the list
      fetchVacancies()
      setDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving vacancy:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      salary_start: '',
      salary_end: '',
      type: '',
      description: '',
      benefits: '',
    })
    setEditingVacancy(null)
  }

  const handleEdit = (vacancy) => {
    setEditingVacancy(vacancy)
    setFormData({
      title: vacancy.title,
      salary_start: vacancy.salary_start.toString(),
      salary_end: vacancy.salary_end ? vacancy.salary_end.toString() : '',
      type: typeof vacancy.type === 'string' ? vacancy.type : (Array.isArray(vacancy.type) ? vacancy.type[0] || '' : ''),
      description: vacancy.description || '',
      benefits: Array.isArray(vacancy.benefits) ? vacancy.benefits.join(', ') : vacancy.benefits || '',
    })
    setDialogOpen(true)
  }

  const handleDelete = async (vacancyId) => {
    if (confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
      try {
        await deleteVacancy(vacancyId)
        fetchVacancies() // Refresh the list
      } catch (error) {
        console.error('Error deleting vacancy:', error)
      }
    }
  }

  if (loading) {
    return <div className="p-4">Memuat daftar lowongan kerja...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Daftar Lowongan Kerja</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              resetForm()
              setEditingVacancy(null)
            }}>
              Tambah Lowongan Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingVacancy ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Lowongan</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary_start">Gaji Awal (Rp)</Label>
                  <Input
                    id="salary_start"
                    name="salary_start"
                    type="number"
                    value={formData.salary_start}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="salary_end">Gaji Akhir (Rp)</Label>
                  <Input
                    id="salary_end"
                    name="salary_end"
                    type="number"
                    value={formData.salary_end}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="type">Jenis Pekerjaan</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Pilih jenis pekerjaan</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="description">Deskripsi Pekerjaan</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="benefits">Benefit (dipisahkan koma)</Label>
                <Input
                  id="benefits"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  placeholder="Asuransi kesehatan, Tunjangan hari raya, dll"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setDialogOpen(false)
                    resetForm()
                  }}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {editingVacancy ? 'Update' : 'Simpan'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {vacancies.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            Belum ada lowongan kerja yang terdaftar
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vacancies.map((vacancy) => (
            <Card key={vacancy.id}>
              <CardContent className="p-4">
                <div>
                  <h4 className="font-bold text-lg mb-1">{vacancy.title}</h4>
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs px-2 py-1">
                      Rp {Number(vacancy.salary_start).toLocaleString()}
                      {vacancy.salary_end && ` - ${Number(vacancy.salary_end).toLocaleString()}`}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  {typeof vacancy.type === 'string' ? vacancy.type : (Array.isArray(vacancy.type) ? vacancy.type[0] || '' : '')}
                </div>
                
                <div className="text-sm mb-3 line-clamp-3">
                  {vacancy.description?.substring(0, 100)}{vacancy.description?.length > 100 ? '...' : ''}
                </div>
                
                {vacancy.benefits && (
                  <div className="text-xs mb-3">
                    <span className="font-medium">Benefits:</span>{' '}
                    {Array.isArray(vacancy.benefits) ? vacancy.benefits.join(', ') : vacancy.benefits}
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(vacancy)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(vacancy.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}