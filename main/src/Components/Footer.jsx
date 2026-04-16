import { Link2 } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16 border-t border-gray-800">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {['Sobre', 'Contate-nos','Termos de Serviço'].map((item) => (
                <li key={item}>
                  <button className="text-gray-500 hover:text-white text-sm transition-colors duration-200 bg-transparent border-0 p-0 cursor-pointer">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Redes Sociais</h3>
            <a
              href="https://www.linkedin.com/in/rafael-menezes-58a6b3274/"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Link2 size={28} />
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-600 space-y-1">
          <p>© 2025 Music Store. Desenvolvido por Rafael.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
