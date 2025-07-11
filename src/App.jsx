import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// project-imports
import router from 'routes';
import AuthGuard from './utils/AuthGuard';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
