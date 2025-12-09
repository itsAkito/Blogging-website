import React, { useEffect, useState } from 'react'
import BlogTable from '../../components/BlogTable'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { Search, FileText, RefreshCw, Loader2, AlertCircle } from 'lucide-react'

const ListBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Note: Removed the duplicate 'axios' import from top, using Context only
  const { axios, token } = useAppContext()

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/admin/blogs', {
        headers: { Authorization: token }
      });
      if (data.success) {
        setBlogs(data.blogs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle Refresh Click
  const handleRefresh = () => {
    fetchBlogs();
    toast.success("Refreshing list...");
  }

  // Filter Logic
  const filteredBlogs = Array.isArray(blogs) ? blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className='flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 transition-colors duration-300'>
      
      {/* --- Header Section --- */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2'>
            <FileText className="text-blue-600 dark:text-blue-400" /> 
            Manage Posts
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            Overview of all blog posts ({blogs.length} total)
          </p>
        </div>

        <div className='flex gap-3 w-full sm:w-auto'>
           {/* Refresh Button */}
           <button 
              onClick={handleRefresh} 
              className='p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
              title="Refresh Data"
           >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
           </button>

           {/* Search Bar */}
           <div className='relative flex-1 sm:w-64'>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by title..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
              />
           </div>
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
        
        {loading ? (
          // Loading State
          <div className='flex flex-col items-center justify-center h-64'>
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400 animate-pulse">Loading content...</p>
          </div>
        ) : filteredBlogs.length > 0 ? (
          // Data Table
          <div className='overflow-x-auto scrollbar-hide'>
            <table className='w-full text-sm text-left'>
              <thead className='text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700'>
                <tr>
                  <th scope='col' className='px-6 py-4 font-semibold'>#</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Blog Title</th>
                  <th scope='col' className='px-6 py-4 font-semibold max-sm:hidden'>Date</th>
                  <th scope='col' className='px-6 py-4 font-semibold max-sm:hidden'>Status</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
                {filteredBlogs.map((blog, index) => (
                  <BlogTable 
                    key={blog._id} 
                    blog={blog}
                    fetchBlogs={fetchBlogs} 
                    index={index + 1} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Empty State
          <div className='flex flex-col items-center justify-center h-64 text-center px-4'>
            <div className='bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4'>
               <AlertCircle className="w-8 h-8 text-gray-400 dark:text-gray-300" />
            </div>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>No blogs found</h3>
            <p className='text-gray-500 dark:text-gray-400 mt-1 max-w-sm'>
              {searchTerm ? `No results for "${searchTerm}"` : "You haven't created any blog posts yet."}
            </p>
            {searchTerm && (
               <button onClick={()=>setSearchTerm('')} className='mt-4 text-blue-600 hover:underline'>Clear Search</button>
            )}
          </div>
        )}
      </div>
      
      {/* Footer Info */}
      <div className='mt-4 text-xs text-center text-gray-400 dark:text-gray-500'>
        Showing {filteredBlogs.length} of {blogs.length} entries
      </div>
    </div>
  )
}

export default ListBlog