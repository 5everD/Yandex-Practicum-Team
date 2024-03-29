import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/Login'
import { MainPage } from './pages/Main'
import { SignupPage } from './pages/Signup'
import { ProfilePage } from './pages/Profile'
import { GamePage } from './pages/game.page'
import { GameStartPage } from '@/pages/GameStart'
import { GameEndPage } from '@/pages/GameEnd'
import { LeaderboardPage } from './pages/Leaderboard'
import { ForumPage } from './pages/Forum'
import { ForumPostPage } from '@/pages/ForumPost'
import { Page404 } from './pages/Page_404'
import { GlobalWrapper } from './components/GlobalWrapper'
import { startServiceWorker } from '@/sw.init'
import { AuthRequired } from '@/components/AuthRequired'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ToggleTheme } from '@/components/ToggleTheme'
import { ThemeContextProvider } from '@/context/ThemeProvider'
import './App.css'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`
      try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
      } catch (err) {
        console.log('server api request failed')
      }
    }

    fetchServerData()
    startServiceWorker()
  }, [])

  return (
    <ThemeContextProvider>
      <GlobalWrapper className={'global-wrapper'}>
        <ToggleTheme />
        <ErrorBoundary>
          <Routes>
            <Route element={<AuthRequired />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="game" element={<GamePage />} />
              <Route path="game-start" element={<GameStartPage />} />
              <Route path="game-end" element={<GameEndPage />} />
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="forum">
                <Route index element={<ForumPage />} />
                <Route path=":forumId" element={<ForumPostPage />} />
              </Route>
            </Route>
            <Route path="/" element={<MainPage />} index />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </ErrorBoundary>
      </GlobalWrapper>
    </ThemeContextProvider>
  )
}

export default App
