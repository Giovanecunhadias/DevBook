'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { verifyEmail } from './actions';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token && email) {
      verifyEmail(token, email)
        .then((result) => {
          setStatus(result.success ? 'success' : 'error');
          setMessage(result.message || '');
        })
        .catch(() => {
          setStatus('error');
          setMessage('Erro ao verificar email');
        });
    } else {
      setStatus('error');
      setMessage('Link inválido');
    }
  }, [token, email]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-xl font-semibold text-gray-700">Verificando seu email...</h2>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-700">Email verificado com sucesso!</h2>
            <p className="text-gray-500">Agora você pode fazer login na sua conta.</p>
            <Link
              href="/login"
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Ir para o login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="w-16 h-16 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-700">Link inválido ou expirado</h2>
            <p className="text-gray-500">{message}</p>
            <Link
              href="/resend-verification"
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Solicitar novo link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailFormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-xl font-semibold text-gray-700">Carregando...</h2>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailForm />
    </Suspense>
  );
}