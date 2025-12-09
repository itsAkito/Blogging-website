import React, { useEffect, useState } from 'react'
import CommentTable from '../../components/CommentTable'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'
import { MessageSquare, CheckCircle2, Clock, RefreshCw, Loader2, AlertCircle } from 'lucide-react'

const Comment = () => {
    const [filter, setFilter] = useState('Not Approved') // 'Not Approved' = Pending
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    
    const { axios, token } = useAppContext()

    const fetchComment = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get('/api/admin/comment', {
                headers: { Authorization: token }
            })
            if (data.success) {
                setComments(data.comments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRefresh = () => {
        fetchComment();
        toast.success("Refreshing comments...");
    }

    useEffect(() => {
        fetchComment()
    }, [])

    // Logic to calculate counts for the badges
    const pendingCount = comments.filter(c => !c.isApproved).length;
    const approvedCount = comments.filter(c => c.isApproved).length;

    // Filter Logic
    const filteredComments = comments.filter((comment) => {
        return filter === "Approved" ? comment.isApproved === true : comment.isApproved === false;
    });

    return (
        <div className='flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 transition-colors duration-300'>
            
            {/* --- Header Section --- */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2'>
                        <MessageSquare className="text-blue-600 dark:text-blue-400" />
                        Comment Management
                    </h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                        Moderate and manage user interactions.
                    </p>
                </div>
                
                <button 
                    onClick={handleRefresh}
                    className='p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                    title="Refresh List"
                >
                    <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {/* --- Custom Tabs --- */}
            <div className='flex p-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full sm:w-fit mb-6 shadow-sm'>
                <button 
                    onClick={() => setFilter('Not Approved')}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${filter === 'Not Approved' 
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                >
                    <Clock size={16} /> Pending
                    <span className={`text-xs px-2 py-0.5 rounded-full ${filter === 'Not Approved' ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        {pendingCount}
                    </span>
                </button>

                <button 
                    onClick={() => setFilter('Approved')}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${filter === 'Approved' 
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 shadow-sm' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                >
                    <CheckCircle2 size={16} /> Approved
                    <span className={`text-xs px-2 py-0.5 rounded-full ${filter === 'Approved' ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        {approvedCount}
                    </span>
                </button>
            </div>

            {/* --- Main Content Table --- */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden min-h-[400px]'>
                
                {/* Header Row */}
                <div className='grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                    <div className='col-span-12 sm:col-span-6'>Blog Title & Content</div>
                    <div className='hidden sm:block sm:col-span-3'>Date</div>
                    <div className='hidden sm:block sm:col-span-3 text-right'>Actions</div>
                </div>

                {/* Body */}
                <div className='divide-y divide-gray-100 dark:divide-gray-700'>
                    {loading ? (
                        <div className='flex flex-col items-center justify-center h-64'>
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
                            <p className="text-gray-500 animate-pulse">Loading comments...</p>
                        </div>
                    ) : filteredComments.length > 0 ? (
                        // Render Filtered Comments
                        filteredComments.map((comment, index) => (
                             <CommentTable
                                key={comment._id}
                                comment={comment}
                                index={index + 1}
                                fetchComments={fetchComment}
                            />
                        ))
                    ) : (
                        // Empty State
                        <div className='flex flex-col items-center justify-center h-64 text-center px-4'>
                            <div className='bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4'>
                                <AlertCircle className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>No {filter.toLowerCase()} comments</h3>
                            <p className='text-gray-500 dark:text-gray-400 mt-1'>
                                {filter === 'Not Approved' ? "You're all caught up! No pending moderation." : "No approved comments found yet."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Comment