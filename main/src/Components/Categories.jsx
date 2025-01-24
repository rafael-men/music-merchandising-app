import React, { useState } from 'react';

const Categories = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: 'Teclados e Pianos', link: '#' },
    { name: 'Guitarras e Baixos', link: '#' },
    { name: 'Acessórios para Guitarras', link: '#' },
    { name: 'Vestuário', link: '#' },
    { name: 'Discos e Álbuns de Banda', link: '#' },
    { name: 'Produtos Licenciados', link: '#' },
    { name: 'Canecas', link: '#' },
    { name: 'Presentes', link: '#' },
  ];

  return (
    <div className="bg-black mb-2 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

          <div className="text-white text-xl font-semibold">
            <span>O que você deseja?</span>
          </div>

          <button
            className="text-white lg:hidden block"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

     
        <div
          className={`flex flex-wrap justify-start mt-4 lg:mt-0 space-x-4 ${
            isMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:flex-row lg:space-x-6`} 
        >
          {categories.map((category, index) => (
            <div key={index} className="relative group">
              <a
                href={category.link || '#'}
                className="text-sm font-medium text-white no-underline hover:bg-slate-600 hover:rounded-lg transition-all duration-300 px-4 py-2 inline-block"
              >
                {category.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
