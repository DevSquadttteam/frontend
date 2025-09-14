'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        alert('✅ Успешный вход')
        console.log('Token:', data.token)
        // TODO: сохранить токен в localStorage или cookie
      } else {
        alert(`❌ Ошибка: ${data.message || 'Неверные данные'}`)
      }
    } catch (err) {
      console.error('Ошибка сети:', err)
      alert('❌ Ошибка сети')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Background Medical Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="8" y="2" width="4" height="16" fill="#059669"/>
              <rect x="2" y="8" width="16" height="4" fill="#059669"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-grid)" />
        </svg>
      </div>

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-blue-200/30 animate-pulse">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h9v2H4zm0 5h9v2H4zm0 5h6v2H4z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-16 text-emerald-200/30 animate-bounce">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-20 text-blue-200/20 animate-pulse">
          <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute top-1/2 right-10 text-emerald-200/20 animate-pulse">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"/>
          </svg>
        </div>
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Hospital Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 rounded-full mb-6 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full animate-pulse opacity-50"></div>
              <svg className="relative w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">MedCenter Pro</h1>
            <p className="text-slate-600">Система управления медицинским центром</p>
          </div>

          {/* Login Card */}
          <div className={cn(
            'bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/50',
            'animate-in fade-in zoom-in duration-700 ease-out',
            'relative overflow-hidden'
          )}>
            {/* Decorative Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500"></div>
            
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Вход в систему</h2>
              <p className="text-slate-600 text-sm">Введите ваши учетные данные для доступа</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
                  Электронная почта
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@medcenter.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 h-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all duration-200 group-hover:border-slate-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium text-sm">
                  Пароль
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 h-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all duration-200 group-hover:border-slate-300"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 focus:ring-2"
                  />
                  <span>Запомнить меня</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium">
                  Забыли пароль?
                </a>
              </div>

              <Button
                type="submit"
                className={cn(
                  "w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700",
                  "text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform",
                  "hover:shadow-xl hover:-translate-y-0.5",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                  loading && "animate-pulse"
                )}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                    </svg>
                    <span>Вход в систему...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Войти в систему</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Registration Link */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-center text-slate-600 text-sm mb-4">
                Нет учетной записи в системе?
              </p>
              <a
                href="/register"
                className={cn(
                  "block w-full text-center py-3 px-4 rounded-lg border-2 border-slate-200",
                  "text-slate-700 font-medium hover:border-blue-300 hover:bg-blue-50",
                  "transition-all duration-200 hover:shadow-md"
                )}
              >
                Зарегистрировать нового сотрудника
              </a>
            </div>

            {/* Security Indicators */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <span>SSL Защита</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/>
                </svg>
                <span>HIPAA Совместимо</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-sm text-slate-500">
              © 2024 MedCenter Pro. Все права защищены.
            </p>
            <div className="flex justify-center space-x-4 text-xs text-slate-400">
              <a href="#" className="hover:text-slate-600 transition-colors">Политика конфиденциальности</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-600 transition-colors">Условия использования</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-600 transition-colors">Поддержка</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}