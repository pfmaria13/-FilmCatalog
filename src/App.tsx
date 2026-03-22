import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { Layout } from '@src/components';
import { FavoritesPage, MovieDetailPage, MovieListPage } from '@src/pages';
import { FavoritesProvider, CompareProvider } from '@src/contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SearchRedirect = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return <Navigate to={search ? `/?${search}` : '/'} replace />;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <CompareProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<MovieListPage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/search" element={<SearchRedirect />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </CompareProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
