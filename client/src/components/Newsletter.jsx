import React, { useState } from 'react'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        // Mock API call simulation
        if(email) {
            toast.success("Successfully subscribed!");
            setIsSubscribed(true);
            setEmail('');
            
            // Reset state after 3 seconds so they can subscribe another email if needed
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    }

    return (
        <div className='max-w-4xl mx-auto px-4 my-32'>
            <div className='relative bg-blue-600 dark:bg-blue-900/50 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl'>
                
                {/* Decorative Background Circles */}
                <div className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl'></div>
                <div className='absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-80 h-80 bg-violet-500 rounded-full opacity-20 blur-3xl'></div>

                <div className='relative z-10 flex flex-col items-center text-center'>
                    
                    {/* Icon Badge */}
                    <div className='bg-white/10 p-3 rounded-full mb-6 backdrop-blur-sm'>
                        <Mail className='w-8 h-8 text-white' />
                    </div>

                    <h1 className='text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
                        Never Miss a Post
                    </h1>
                    
                    <p className='text-blue-100 md:text-lg mb-8 max-w-lg leading-relaxed'>
                        Join our community of 10,000+ developers. Get the latest tutorials, tech news, and exclusive insights delivered straight to your inbox.
                    </p>

                    {isSubscribed ? (
                        <div className='animate-fade-in flex items-center gap-2 bg-white/10 text-white px-6 py-4 rounded-xl border border-white/20'>
                            <CheckCircle2 className='w-6 h-6 text-green-400' />
                            <span className='font-medium'>Thanks for subscribing! Check your inbox.</span>
                        </div>
                    ) : (
                        <form onSubmit={onSubmitHandler} className='w-full max-w-md flex flex-col sm:flex-row gap-3'>
                            <div className='relative flex-grow'>
                                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                                    <Mail className='h-5 w-5 text-gray-400' />
                                </div>
                                <input 
                                    type='email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email address' 
                                    required
                                    className='w-full pl-11 pr-4 py-3.5 bg-white/95 dark:bg-gray-900/90 border-2 border-transparent focus:border-blue-300 rounded-xl outline-none text-gray-900 dark:text-white placeholder-gray-500 transition-all shadow-lg' 
                                />
                            </div>
                            
                            <button 
                                type='submit' 
                                className='bg-gray-900 dark:bg-white text-white dark:text-blue-900 font-semibold px-8 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl'
                            >
                                Subscribe <ArrowRight className='w-4 h-4' />
                            </button>
                        </form>
                    )}
                    
                    <p className='text-blue-200/60 text-xs mt-6'>
                        No spam, ever. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Newsletter