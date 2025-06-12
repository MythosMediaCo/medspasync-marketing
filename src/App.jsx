import React from 'react';
import { Routes } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <ScrollToTop />
      <main className="flex-1">
        <Routes>{routes}</Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}

export default App;
