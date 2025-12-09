import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { Search, X, Sparkles, ArrowRight } from 'lucide-react' // Clean icons

const Header = () => {
    const { setInput, input } = useAppContext();
    const inputRef = useRef();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setInput(inputRef.current.value)
    }

    const onClear = () => {
        setInput('')
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div className='relative px-4 pt-20 pb-16 sm:pt-32 sm:pb-24 overflow-hidden'>
            
            {/* Background Decoration (Optional: keeps your gradient image but positions it better) */}
            <img 
                src={assets.gradientBackground} 
                alt='' 
                className='absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-40 dark:opacity-10 pointer-events-none' 
            />

            <div className='max-w-4xl mx-auto text-center relative z-10'>
                
                {/* 1. Animated Feature Badge */}
                <div className='inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-blue-50 border border-blue-100 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 shadow-sm hover:scale-105 transition-transform cursor-default animate-fade-in-up'>
                    <Sparkles className="w-4 h-4" />
                    <span className='text-xs font-bold tracking-wide uppercase'>New: AI Power Added</span>
                </div>

                {/* 2. Hero Title with Gradient */}
                <h1 className='text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight'>
                    Here is our own <br className="hidden sm:block" />
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400'>
                        Intelligent Blogging
                    </span>
                    {' '}Platform
                </h1>

                {/* 3. Subtitle */}
                <p className='text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed'>
                    This is your space to think out loud. Share what matters, write without filters, and let our AI assist your creativity.
                </p>

                {/* 4. Rich Search Bar */}
                <form 
                    onSubmit={onSubmitHandler} 
                    className='relative max-w-xl mx-auto group'
                >
                    <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    
                    <input 
                        ref={inputRef} 
                        type='text'
                        aria-label='Search blog input'
                        placeholder='Search for topics, ideas, or stories...'
                        required
                        className='block w-full pl-12 pr-32 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-xl shadow-blue-900/5' 
                    />

                    {/* Action Button inside Input */}
                    <div className='absolute inset-y-1.5 right-1.5'>
                        <button 
                            type='submit' 
                            className='h-full px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm transition-all flex items-center gap-2'
                        >
                            Search <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </form>

                {/* 5. Clear Search Indicator */}
                <div className={`mt-6 h-8 transition-all duration-300 ${input ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {input && (
                        <button 
                            onClick={onClear} 
                            className='inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors'
                        >
                            <X className="w-4 h-4" />
                            Clear search results for "{input}"
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;