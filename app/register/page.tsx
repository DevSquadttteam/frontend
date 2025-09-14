'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        alert('✅ Регистрация прошла успешно!')
        console.log(data)
      } else {
        alert(`❌ Ошибка: ${data.message || 'Не удалось зарегистрироваться'}`)
      }
    } catch (err) {
      console.error('Ошибка сети:', err)
      alert('❌ Ошибка сети')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Регистрация</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">ФИО</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Введите ФИО"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="username">Имя пользователя</Label>
          <Input
            id="username"
            name="username"
            placeholder="Введите имя"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Введите email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Зарегистрироваться
        </Button>
      </form>
    </div>
  )
}
