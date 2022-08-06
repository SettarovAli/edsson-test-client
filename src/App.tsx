import { useEffect } from 'react';

import Router from './routes/Router';

import {
  fetchDocuments,
  fetchDocumentsDefinitionAndLayout,
} from './store/documentsSlice';
import { useAppDispatch } from './store/store';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDocuments());
    dispatch(fetchDocumentsDefinitionAndLayout());
  }, []);

  return <Router />;
};

export default App;
