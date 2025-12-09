import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react' // Import icons

const Navbar = () => {

    const { token } = useAppContext()
    const navigate = useNavigate()

    // 1. Initialize state from localStorage (or default to 'light')
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    // 2. Effect to apply the theme to the HTML document
    useEffect(() => {
        const root = window.document.documentElement
        
        if (theme === 'dark') {
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [theme])

    // 3. Toggle Function
    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    return (
        // Added dark:bg-gray-900 and dark:border-b to the container
        <div className='flex justify-between items-center py-5 px-8 sm:mx-20 xl:mx-50 transition-colors duration-300 dark:bg-gray-900 dark:border-gray-800'>
            
            {/* Logo */}
            <img 
                onClick={() => navigate('/')} 
                src={assets.logo} 
                alt='logo' 
                className='w-14 sm:w-44 cursor-pointer' 
            />

            <div className='flex items-center gap-6'>
                {/* Theme Toggle Button */}
                <button 
                    onClick={toggleTheme} 
                    className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                    title="Toggle Theme"
                >
                    {theme === 'dark' ? (
                        <Sun className="w-6 h-6 text-yellow-400" />
                    ) : (
                        <Moon className="w-6 h-6 text-gray-600" />
                    )}
                </button>

                {/* Dashboard/Login Button */}
                <button 
                    onClick={() => navigate('/admin')} 
                    className='flex items-center rounded-full px-6 sm:px-10 py-2.5 gap-3 text-sm cursor-pointer text-white bg-blue-500 hover:bg-blue-600 transition-all shadow-md'
                >
                    {token ? 'Dashboard' : 'Login'}
                    <img className='w-2 invert brightness-0' src={assets.arrow} alt='arrow' />
                </button>
            </div>
        </div>
    )
}

export default Navbar