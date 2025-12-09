import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import { motion, AnimatePresence } from 'motion/react'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'
import { SearchX, Filter } from 'lucide-react' // Install lucide-react if needed

const BlogList = () => {
    const [menu, setMenu] = useState('All')
    const { blogs, input } = useAppContext()

    // Combined Logic: Filter by Category AND Search Input
    const getFilteredBlogs = () => {
        return blogs.filter((blog) => {
            const matchesSearch = input.trim() === '' || 
                                  blog.title.toLowerCase().includes(input.toLowerCase()) || 
                                  blog.category.toLowerCase().includes(input.toLowerCase());
            
            const matchesCategory = menu === 'All' || blog.category === menu;

            return matchesSearch && matchesCategory;
        })
    }

    const displayedBlogs = getFilteredBlogs();

    return (
        <div className='w-full px-4 sm:px-8 xl:px-20'>
            
            {/* --- Section Title --- */}
            <div className='mb-8 text-center sm:text-left mt-10'>
                <h2 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-3'>
                   <Filter className="w-6 h-6 text-blue-500" /> Latest Articles
                </h2>
                <p className='text-gray-500 dark:text-gray-400 mt-2'>
                    Explore insights by category or search for specific topics.
                </p>
            </div>

            {/* --- Category Menu (Scrollable on mobile) --- */}
            <div className='flex justify-start sm:justify-center overflow-x-auto pb-4 mb-8 scrollbar-hide'>
                <div className='flex gap-2 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700 backdrop-blur-sm'>
                    {blogCategories.map((item) => (
                        <button
                            key={item}
                            onClick={() => setMenu(item)}
                            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 outline-none
                                ${menu === item ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}
                            `}
                        >
                            {/* The Text (z-10 ensures it sits on top of the moving background) */}
                            <span className='relative z-10'>{item}</span>

                            {/* The Moving Background Pill */}
                            {menu === item && (
                                <motion.div
                                    layoutId="activeCategory"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className='absolute inset-0 bg-blue-600 rounded-full shadow-md'
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Blog Grid --- */}
            <motion.div 
                layout 
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 min-h-[300px]'
            >
                <AnimatePresence mode='popLayout'>
                    {displayedBlogs.length > 0 ? (
                        displayedBlogs.map((blog) => (
                            <motion.div
                                layout
                                key={blog._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <BlogCard blog={blog} />
                            </motion.div>
                        ))
                    ) : (
                        // --- Empty State ---
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className='col-span-full flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700'
                        >
                            <div className='bg-gray-200 dark:bg-gray-800 p-4 rounded-full mb-4'>
                                <SearchX className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                            </div>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>No articles found</h3>
                            <p className='text-gray-500 dark:text-gray-400 max-w-sm mt-2'>
                                We couldn't find any blogs matching "{input}" in the {menu} category. Try adjusting your search.
                            </p>
                            <button 
                                onClick={() => { setMenu('All') }} 
                                className='mt-6 text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline'
                            >
                                Clear Filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default BlogList