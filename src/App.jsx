import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Search, Loader, ServerCrash, Info } from 'lucide-react';

const API_URL = 'https://gutendex.com/books/';

const Header = ({ onSearch, onLanguageChange, selectedLanguage }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="w-full max-w-5xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-white">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Book className="h-7 w-7" />
          </div>
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Catálogo de Livros
          </h1>
        </div>
        <form onSubmit={handleSearch} className="w-full md:w-auto flex flex-col md:flex-row gap-2">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título ou autor..."
              className="w-full bg-gray-800/50 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full md:w-auto bg-gray-800/50 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
          >
            <option value="">Qualquer idioma</option>
            <option value="en">Inglês</option>
            <option value="pt">Português</option>
            <option value="es">Espanhol</option>
            <option value="fr">Francês</option>
            <option value="de">Alemão</option>
          </select>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2">
            <Search className="h-5 w-5" />
            <span>Buscar</span>
          </button>
        </form>
      </motion.div>
    </header>
  );
};

const BookCard = ({ book, index }) => {
  const author = book.authors[0] ? book.authors[0].name : 'Autor desconhecido';
  const coverUrl = book.formats['image/jpeg'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-gray-800/40 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-64 bg-gray-700">
        {coverUrl ? (
          <img 
            src={coverUrl}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-full object-cover"
           src="https://images.unsplash.com/photo-1599664877771-ed475ff0df7b" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <Book className="w-16 h-16 text-gray-600" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white truncate" title={book.title}>{book.title}</h3>
        <p className="text-sm text-gray-400 mt-1">{author}</p>
        <div className="mt-4 flex-grow"></div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{book.languages.join(', ').toUpperCase()}</span>
          <span>Downloads: {book.download_count}</span>
        </div>
      </div>
    </motion.div>
  );
};

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center gap-4 text-purple-400">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Loader className="w-12 h-12" />
    </motion.div>
    <p className="text-lg">Buscando livros...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="flex flex-col items-center justify-center gap-4 text-red-400 bg-red-900/20 p-8 rounded-lg">
    <ServerCrash className="w-12 h-12" />
    <h2 className="text-xl font-bold">Oops! Algo deu errado.</h2>
    <p>{message}</p>
  </div>
);

const InfoMessage = ({ title, message }) => (
    <div className="text-center text-gray-400 p-8 rounded-lg bg-gray-800/30 flex flex-col items-center gap-4">
        <Info className="w-12 h-12 text-purple-500" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p>{message}</p>
    </div>
);

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(''); // New state for language

  const fetchBooks = useCallback(async (query, language) => {
    setLoading(true);
    setError(null);
    try {
      let url = API_URL;
      const params = [];

      if (query) {
        params.push(`search=${encodeURIComponent(query)}`);
      }
      if (language) {
        params.push(`languages=${encodeURIComponent(language)}`);
      }

      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Não foi possível buscar os livros. Tente novamente mais tarde.');
      }
      const data = await response.json();
      setBooks(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(searchTerm, selectedLanguage);
  }, [fetchBooks, searchTerm, selectedLanguage]);

  return (
    <>
      <Helmet>
        <title>Catálogo de Livros Interativo</title>
        <meta name="description" content="Explore milhares de livros clássicos com este catálogo interativo." />
      </Helmet>
      <div className="min-h-screen bg-gray-900 text-white font-sans bg-grid-purple-500/[0.05]">
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900">
          <Header 
            onSearch={setSearchTerm} 
            onLanguageChange={setSelectedLanguage} 
            selectedLanguage={selectedLanguage} 
          />
          <main className="w-full max-w-7xl mx-auto p-4 md:p-6">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loader" className="flex justify-center items-center h-96">
                  <LoadingSpinner />
                </motion.div>
              ) : error ? (
                <motion.div key="error" className="flex justify-center items-center h-96">
                  <ErrorMessage message={error} />
                </motion.div>
              ) : books.length > 0 ? (
                <motion.div
                  key="book-grid"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                  {books.map((book, index) => (
                    <BookCard key={book.id} book={book} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div key="no-results" className="flex justify-center items-center h-96">
                    <InfoMessage 
                        title="Nenhum livro encontrado"
                        message={searchTerm || selectedLanguage ? `Tente uma busca ou idioma diferente para "${searchTerm || 'sua seleção'}".` : "Use a barra de busca e o seletor de idioma para encontrar livros."}
                    />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
          <footer className="text-center p-6 text-gray-500 text-sm">
            <p>Desenvolvido com ❤️ por LiterAlura Thiago Marques. Dados fornecidos pela API Gutendex.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;