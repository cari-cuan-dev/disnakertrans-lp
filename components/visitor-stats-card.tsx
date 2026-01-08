'use client';

import { useState, useEffect } from 'react';

interface VisitorStats {
  totalVisitors: number;
  totalVisits: number;
  growthRate: number;
}

export default function VisitorStatsCard() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/analytics/visitors/stats?year=${currentYear}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error('Failed to fetch visitor stats:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching visitor stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentYear]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-xl shadow-lg">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="text-center p-6 bg-gray-50 rounded-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-xl shadow-lg">
      {/* Total Pengunjung Card */}
      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Pengunjung</h3>
        <p className="text-3xl font-bold text-blue-600">
          {stats?.totalVisitors?.toLocaleString() || '0'}
        </p>
        <p className="text-sm text-gray-500 mt-1">Unik per {currentYear}</p>
      </div>

      {/* Total Kunjungan Card */}
      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Kunjungan</h3>
        <p className="text-3xl font-bold text-green-600">
          {stats?.totalVisits?.toLocaleString() || '0'}
        </p>
        <p className="text-sm text-gray-500 mt-1">Tahun {currentYear}</p>
      </div>

      {/* Pertumbuhan YoY Card */}
      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Pertumbuhan YoY</h3>
        <p className={`text-3xl font-bold ${
          stats?.growthRate !== undefined && stats.growthRate >= 0 
            ? 'text-green-600' 
            : 'text-red-600'
        }`}>
          {stats?.growthRate !== undefined 
            ? `${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate.toFixed(2)}%` 
            : '0.00%'}
        </p>
        <p className="text-sm text-gray-500 mt-1">vs Tahun {currentYear - 1}</p>
      </div>
    </div>
  );
}