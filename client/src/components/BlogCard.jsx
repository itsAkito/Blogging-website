
 import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react'; // Make sure to npm install lucide-react if you haven't

const BlogCard = ({ blog = {} }) => {
    const { title, description, category, image, _id, createdAt } = blog;
    const navigate = useNavigate();

    // Helper to strip HTML tags for a clean text preview
    const createMarkup = (htmlContent) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = htmlContent;
        const text = tmp.textContent || tmp.innerText || "";
        return text.slice(0, 120) + "..."; // increased limit to 120 for better readability
    }

    return (
        <div 
            onClick={() => navigate(`/blog/${_id}`)} 
            className='group cursor-pointer flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'
        >
            {/* Image Container with Zoom Effect */}
            <div className='relative overflow-hidden aspect-video'>
                <img 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                    src={image} 
                    alt={title} 
                />
                
                {/* Category Badge overlay */}
                <div className='absolute top-4 left-4'>
                    <span className='px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm'>
                        {category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className='p-6 flex flex-col flex-grow'>
                
                {/* Title */}
                <h5 className='mb-3 text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                    {title}
                </h5>

                {/* Description Preview (Clean Text) */}
                <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3'>
                    {description ? createMarkup(description) : "No description available."}
                </p>

                {/* Footer: Read More & Date (optional if you have date) */}
                <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto'>
                    <div className='flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group/btn'>
                        Read Article 
                        <ArrowRight className='w-4 h-4 transition-transform group-hover/btn:translate-x-1' />
                    </div>
                    
                    {/* Optional: If you want to show date later */}
                    {/* <div className='flex items-center gap-1 text-xs text-gray-400'>
                        <Clock className='w-3 h-3' />
                        <span>Recent</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default BlogCard