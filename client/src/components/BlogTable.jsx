import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { Trash2, Globe, EyeOff, Loader2 } from 'lucide-react' // Install lucide-react if needed

const BlogTable = ({ blog, index, fetchBlogs }) => {

    const { title, createdAt, isPublished, _id } = blog
    const BlogDate = new Date(createdAt)
    const { axios, token } = useAppContext();
    
    // Local loading states for better UX
    const [isDeleting, setIsDeleting] = useState(false)
    const [isToggling, setIsToggling] = useState(false)

    const deleteBlogs = async () => {
        // Custom confirmation dialog (native is fine for admin panels)
        const confirm = window.confirm('Are you sure you want to permanently delete this blog?')
        if (!confirm) return;

        setIsDeleting(true)
        try {
            const { data } = await axios.post('/api/add/delete', { id: _id }, {
                headers: { Authorization: token }
            })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsDeleting(false)
        }
    }

    const togglePublish = async () => {
        setIsToggling(true)
        try {
            const { data } = await axios.post('/api/add/toggle-publish', { id: _id }, {
                headers: { Authorization: token }
            })
            if (data.success) {
                const status = !isPublished ? "Published!" : "Unpublished";
                toast.success(`Blog ${status}`)
                await fetchBlogs();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsToggling(false)
        }
    }

    return (
        <tr className='border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200'>
            
            {/* Index */}
            <td className='px-6 py-4 text-sm text-gray-500 dark:text-gray-400'>
                #{index + 1}
            </td>

            {/* Title */}
            <td className='px-6 py-4'>
                <p className='font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs'>
                    {title}
                </p>
            </td>

            {/* Date (Hidden on mobile) */}
            <td className='px-6 py-4 max-sm:hidden'>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {BlogDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
            </td>

            {/* Status Badge */}
            <td className='px-6 py-4 max-sm:hidden'>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    isPublished 
                    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" 
                    : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    {isPublished ? 'Live' : 'Draft'}
                </span>
            </td>

            {/* Action Buttons */}
            <td className='px-6 py-4'>
                <div className='flex items-center gap-3'>
                    
                    {/* Toggle Publish Button */}
                    <button 
                        type='button'
                        onClick={togglePublish}
                        disabled={isToggling}
                        title={isPublished ? "Unpublish Blog" : "Publish Blog"}
                        className={`p-2 rounded-lg border transition-all ${
                            isPublished 
                            ? 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700' 
                            : 'border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
                        }`}
                    >
                        {isToggling ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isPublished ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Globe className="w-4 h-4" />
                        )}
                    </button>

                    {/* Delete Button */}
                    <button 
                        onClick={deleteBlogs}
                        disabled={isDeleting}
                        title="Delete Blog"
                        className='p-2 rounded-lg border border-transparent text-red-500 hover:bg-red-50 hover:border-red-100 dark:hover:bg-red-900/20 dark:hover:border-red-900 transition-all'
                    >
                         {isDeleting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </td>
        </tr>
    )
}
export default BlogTable
