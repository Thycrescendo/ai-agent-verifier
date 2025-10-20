import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsDashboard: React.FC<{ vcCount: number }> = ({ vcCount }) => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
    datasets: [
      {
        label: 'VCs Issued',
        data: [5, vcCount, 10, 15],
        backgroundColor: 'rgba(30, 64, 175, 0.6)',
      },
    ],
  };

  return (
    <div className="mt-4 w-full max-w-md">
      <h3 className="text-xl text-moca-blue dark:text-moca-purple mb-2">Analytics</h3>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;