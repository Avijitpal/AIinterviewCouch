import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JDInputForm from './features/research/JDInputForm'

function App() {
  return (
    // The "dark" class ensures those oklch variables you sent work correctly!
    <div className="dark">
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <JDInputForm />
      </main>
    </div>
  )
}

export default App