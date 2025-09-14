const Footer = () => {
  return (
    <footer className="w-full border-t mt-10 py-6 text-center text-sm text-muted-foreground">
      <p>
        &copy; {new Date().getFullYear()} Web-Adina. Все права защищены.
      </p>
      <p className="mt-2">
        Разработано с ❤️ в Ташкенте.{' '}
        <a
          href="https://github.com/DevSquadttteam/hack"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          GitHub проекта
        </a>
      </p>
    </footer>
  )
}

export default Footer
