import { RouterProvider } from 'react-router-dom';

// project-imports
import router from 'routes';
import AuthGuard from './utils/AuthGuard';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
