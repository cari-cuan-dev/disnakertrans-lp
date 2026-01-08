'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Mencatat kunjungan setiap kali URL berubah
    const recordVisit = async () => {
      try {
        // Dapatkan IP dari server action atau API endpoint
        // Kita hanya mengirim URL halaman saat ini

        // Cegah tracking untuk halaman-halaman admin atau internal
        if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
          return;
        }

        // Kirim data ke API endpoint analytics
        const response = await fetch('/api/analytics/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page_url: window.location.pathname + window.location.search, // Sertakan query params jika ada
          }),
        });

        if (!response.ok) {
          console.error('Failed to record visit:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error recording visit:', error);
      }
    };

    // Gunakan setTimeout agar eksekusi tidak memblokir rendering
    // Delay sedikit agar tidak mempengaruhi pengalaman pengguna
    const timer = setTimeout(recordVisit, 1000); // Delay 1 detik agar halaman bisa load dulu

    return () => clearTimeout(timer);
  }, [pathname]); // Hanya berjalan saat pathname berubah

  return null; // Komponen ini tidak merender apa-apa
}