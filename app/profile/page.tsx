'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getUserProfile } from '@/lib/actions/user-profile-actions'
import EmployeeProfileForm from '@/components/profile/employee-profile-form'
import CompanyProfileForm from '@/components/profile/company-profile-form'
import CompanyVacanciesTab from '@/components/profile/company-vacancies-tab'

export default function ProfilePage() {
  const [userType, setUserType] = useState<'Employee' | 'Company' | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Mendapatkan user ID dari tempat penyimpanan setelah login
        // Ini bisa dari localStorage, sessionStorage, maupun context
        const userId = Number(localStorage.getItem('user_id') || sessionStorage.getItem('user_id'));

        if (!userId) {
          // Jika user ID tidak ditemukan di local storage, coba ambil dari API berdasarkan token
          const token = localStorage.getItem('access_token');

          if (!token) {
            setError('User tidak login atau token tidak ditemukan');
            setLoading(false);
            return;
          }

          // Menggunakan API eksternal untuk mendapatkan informasi user
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });

          if (response.status === 200) {
            const userData = await response.json();
            const retrievedUserId = userData.id || (userData.user && userData.user.id);

            if (retrievedUserId) {
              // Simpan user ID untuk digunakan di masa mendatang
              localStorage.setItem('user_id', retrievedUserId.toString());

              const profile = await getUserProfile(Number(retrievedUserId));
              setUserProfile(profile);
              setUserType(profile.type);
            } else {
              setError('Gagal mendapatkan user ID dari API');
              setLoading(false);
              return;
            }
          } else {
            setError('Gagal mendapatkan informasi pengguna dari API');
            setLoading(false);
            return;
          }
        } else {
          const profile = await getUserProfile(userId);
          setUserProfile(profile);
          setUserType(profile.type);
        }
      } catch (err) {
        setError('Gagal memuat profil pengguna');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Memuat profil...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => window.history.back() || (window.location.href = '/')}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Kembali ke Dashboard
          </Button>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Profil {userType === 'Employee' ? 'Pekerja' : 'Perusahaan'}</CardTitle>
          </CardHeader>
          <CardContent>
            {userType === 'Employee' ? (
              <EmployeeProfileForm userId={userProfile.id} userProfile={userProfile} />
            ) : userType === 'Company' ? (
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="vacancies">Lowongan Pekerjaan</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                  <CompanyProfileForm userId={userProfile.id} userProfile={userProfile} />
                </TabsContent>
                <TabsContent value="vacancies">
                  <CompanyVacanciesTab companyId={Number(userProfile.id)} />
                </TabsContent>
              </Tabs>
            ) : (
              <div>Role pengguna tidak dikenali</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}