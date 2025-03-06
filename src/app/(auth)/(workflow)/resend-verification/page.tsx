'use client';

import { useState } from 'react';
import { resendVerification } from './actions';
import { AlertCircle, CheckCircle2, Mail } from 'lucide-react';

export default function ResendVerificationPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await resendVerification(email);
      if (result.success) {
        setStatus('success');
        setMessage('Link de verificação enviado com sucesso!');
      } else {
        setStatus('error');
        setMessage(result.message || 'Erro ao enviar o link de verificação');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao enviar o link de verificação');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">Reenviar verificação</h2>
          <p className="text-gray-500 mt-2">
            Digite seu email para receber um novo link de verificação
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-gray-700">{message}</p>
            <p className="text-gray-500 mt-4">
              Verifique sua caixa de entrada e siga as instruções para verificar seu email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'error' && (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 p-3 rounded-md">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{message}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar link de verificação'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}