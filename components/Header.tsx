'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  // Скрыть Header на этих страницах
  const hiddenRoutes = ['/login', '/register', '/dashboard']
  if (hiddenRoutes.includes(pathname)) return null

  return (
    <header className="w-full flex justify-between items-center px-6 md:px-12 py-5 
                       bg-background text-foreground backdrop-blur-md shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div
        className="flex items-center gap-3 text-2xl md:text-3xl font-extrabold cursor-pointer"
        onClick={() => router.push('/')}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center 
                        bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-md">
          <Image src="/assets/logo.png" alt="logo" width={28} height={28} />
        </div>
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text 
                         text-transparent tracking-wide">
          My<span className="text-muted ml-1">Hospital</span>
        </span>
      </div>

      {/* Navbar */}
      <nav className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList className="gap-6 font-medium">
            {[
              { href: '/', label: 'Home' },
              { href: '/doctors', label: 'Find a Doctor' },
              { href: '/services', label: 'Services' },
              { href: '/about', label: 'About Us' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild>
                  <Link href={href} className="text-foreground hover:text-blue-600 transition">
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Auth Buttons */}
      <div className="hidden md:flex gap-3">
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-muted"
          onClick={() => router.push('/login')}
        >
          Sign In
        </Button>
        <Button
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 
                     hover:to-indigo-700 text-white"
          onClick={() => router.push('/register')}
        >
          Get Started
        </Button>
      </div>

      {/* Mobile Menu Placeholder */}
      <div className="md:hidden">
        {/* TODO: Добавить бургер-меню */}
      </div>
    </header>
  )
}
