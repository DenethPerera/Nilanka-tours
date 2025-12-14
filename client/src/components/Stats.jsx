import React from 'react';

const Stats = () => {
  return (
    <div className="bg-emerald-900 py-12 md:py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 text-center divide-x-0 md:divide-x divide-emerald-800/50">
        {[
          { num: '500+', label: 'Happy Travelers' },
          { num: '100+', label: 'Tours Completed' },
          { num: '50+', label: 'Destinations' },
          { num: '24/7', label: 'Support' }
        ].map((stat, i) => (
          <div key={i} className="p-2 md:p-4">
            <h3 className="text-3xl md:text-5xl font-bold text-emerald-400 mb-2">{stat.num}</h3>
            <p className="text-emerald-100 uppercase tracking-widest text-xs md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;