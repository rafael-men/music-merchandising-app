import React from 'react'
import Linkedin from '../Assets/Linkedin.png'

const Footer = () => {
  return (
    <div className="bg-black text-white mt-8">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          {/* Seção de Links */}
          <div className="flex flex-col items-center lg:items-startspace-y-4">
            <h3 className="text-xl font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400 no-underline ">Sobre</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 no-underline ">Contate-nos</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 no-underline ">Política de Privacidade</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 no-underline ">Termos de Serviço</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-center space-y-4 mt-8 lg:mt-0">
            <h3 className="text-xl font-semibold">Siga-me no linked-in</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/rafael-menezes-58a6b3274/" className="text-white hover:text-gray-400">
                <img src={Linkedin} className='w-13 h-14' alt='logo' />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Music Store. Desenvolvido por Rafael.</p>
          <p>Este é um modelo front-end para um e-commerce de artigos musicais.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
