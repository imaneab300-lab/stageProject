import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return <div className="text-center py-20 text-slate-400 min-h-[60vh]">Please log in to view your profile.</div>;

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
      <h1 className="text-3xl font-bold text-slate-100 mb-8">My Profile</h1>
      
      <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700">
        <div className="flex items-center gap-6 mb-8 border-b border-dark-700 pb-8">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-200">{user.name}</h2>
            <p className="text-slate-400">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-dark-900 border border-dark-700 rounded-full text-xs font-medium text-slate-300 capitalize">
              Role: {user.role}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-200 mb-4">Recent Orders</h3>
        <div className="text-center py-12 text-slate-400 bg-dark-900 rounded-xl border border-dark-700">
          You haven't placed any orders yet.
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button variant="secondary" onClick={logout} className="text-red-500 border-red-500/50 hover:bg-red-500/10 hover:border-red-500">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
