import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { store } from './app/store/store'
import AuthListener from './app/providers/AuthListener'
import { Provider } from 'react-redux'
import LenisProvider from './app/providers/LenisProvider'
import ThemeProvider from './app/providers/ThemeProvider'

function App() {

  return (
    <LenisProvider>
      <Provider store={store}>
        <ThemeProvider>
          <AuthListener>
            <RouterProvider router={router} />
          </AuthListener>
        </ThemeProvider>
      </Provider>
    </LenisProvider>
  )
}

export default App
