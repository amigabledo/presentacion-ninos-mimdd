import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const GestionLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    const u = username.trim().toLowerCase();
    const p = password.trim();

    const candidateEmails = u.includes('@')
      ? [u]
      : [`${u}@amigable.do`, `${u}@merch.com`, `${u}@mimdd.org`];

    let autenticado = false;
    for (const email of candidateEmails) {
      try {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: p,
        });

        if (!signInError && data?.user) {
          localStorage.setItem(
            'mimdd_admin_auth',
            JSON.stringify({ user: u, email, time: Date.now() })
          );
          autenticado = true;
          navigate('/gestion');
          return;
        }
      } catch {
        // Continuar siguiente intento
      }
    }

    if (!autenticado) {
      setError('Credenciales incorrectas. Verifique su usuario y contraseña.');
    }
    setCargando(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 mb-3 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-xs p-1">
              <img src="/logo.png" alt="Logo Monte de Dios" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight text-center leading-snug">
              Ministerio Internacional Monte de Dios
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Gestión de presentaciones</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="user" className="block text-xs font-semibold text-slate-700 mb-1">
                Usuario
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="user"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pass" className="block text-xs font-semibold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="pass"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {cargando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Iniciando sesión</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Acceder al panel</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al formulario público</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
