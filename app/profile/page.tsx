'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Eye, EyeOff, Lock } from "lucide-react"
import { getUserProfile } from '@/lib/actions/user-profile-actions'
import EmployeeProfileForm from '@/components/profile/employee-profile-form'
import CompanyProfileForm from '@/components/profile/company-profile-form'
import CompanyVacanciesTab from '@/components/profile/company-vacancies-tab'

export default function ProfilePage() {
  const [userType, setUserType] = useState<'pegawai' | 'perusahaan' | 'admin' | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // States for Change Password
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');

        if (!token) {
          // If no token, redirect to login
          window.location.href = '/login';
          return;
        }

        // Always verify identity via API first to avoid stale localStorage issues
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/kerjaberkah/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.status === 200) {
          const userData = await response.json();
          console.log(userData);
          const retrievedUserId = userData.id || (userData.user && userData.user.id);
          console.log(retrievedUserId);
          if (retrievedUserId) {
            // Update localStorage with fresh confirmed ID
            localStorage.setItem('user_id', retrievedUserId.toString());

            // Check if we already have the profile data from the API response
            // The API might return mixed data, but getUserProfile is safer for full details
            console.log(retrievedUserId);
            console.log(Number(retrievedUserId));
            const profile = await getUserProfile(Number(retrievedUserId)) as any;
            console.log(profile);
            setUserProfile(profile);
            setUserType(profile.type as 'pegawai' | 'perusahaan' | 'admin');

          } else {
            setError('Gagal mendapatkan user ID dari validasi token');
          }
        } else {
          // If token is invalid, clear storage and redirect
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_id');
          window.location.href = '/login';
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

  console.log(userProfile);
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)

    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi password baru tidak cocok.")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("Password baru minimal 8 karakter.")
      return
    }

    setPasswordLoading(true)

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/kerjaberkah/user/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          current_password: currentPassword,
          password: newPassword,
          password_confirmation: confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password berhasil diubah!");
        setIsPasswordModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(data.message || "Gagal mengubah password.");
      }
    } catch (err) {
      console.error('Change password error:', err);
      setPasswordError("Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setPasswordLoading(false);
    }
  }

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
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/';
              }
            }}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Kembali ke Dashboard
          </Button>
          <Dialog open={isPasswordModalOpen} onOpenChange={(open) => {
            setIsPasswordModalOpen(open);
            if (!open) {
              setPasswordError(null);
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
            }
          }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
                <Lock size={16} />
                Ubah Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ubah Password</DialogTitle>
                <DialogDescription>
                  Masukkan password lama dan password baru Anda di bawah ini.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleChangePassword} className="space-y-4 py-4">
                {passwordError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs italic font-medium">
                    {passwordError}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="current_password">Password Lama</Label>
                  <div className="relative">
                    <Input
                      id="current_password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new_password">Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="new_password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="Minimal 8 karakter"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Konfirmasi Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Ulangi password baru"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? "Menyimpan..." : "Simpan Kata Sandi"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Profil {userType === 'pegawai' ? 'Pekerja' : userType === 'perusahaan' ? 'Perusahaan' : 'Admin'}</CardTitle>
          </CardHeader>
          <CardContent>
            {userType === 'pegawai' ? (
              <EmployeeProfileForm userId={userProfile.id} userProfile={userProfile} />
            ) : userType === 'perusahaan' ? (
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
    </div >
  )
}