import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente utilitário que garante que, ao navegar entre rotas,
 * a página sempre inicie com o scroll no topo.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

