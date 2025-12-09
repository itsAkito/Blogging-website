import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { Sparkles, Image as ImageIcon, Loader2, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    
    // Ensure axios is available via Context or import it directly
    const { axios, token } = useAppContext() 

    const handleGenerate = async (e) => {
        e.preventDefault();
        if(!prompt) return;

        setLoading(true);
        setImage(null); // Clear previous image

        try {
            // Adjust the URL to match your new backend route
            const { data } = await axios.post('/api/image/generate-image', 
                { prompt }, 
                { headers: { Authorization: token } }
            );

            if (data.success) {
                setImage(data.imageUrl);
                toast.success("Image generated successfully!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='max-w-3xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700'>
            
            <div className='text-center mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2'>
                    <Sparkles className="text-blue-500" /> AI Image Generator
                </h2>
                <p className='text-gray-500 mt-2'>Turn your imagination into visual art.</p>
            </div>

            {/* Input Section */}
            <form onSubmit={handleGenerate} className='flex gap-3 mb-8'>
                <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want (e.g., 'A futuristic city made of glass')" 
                    className='flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className='w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50'
                >
                    {loading ? <Loader2 className="animate-spin" /> : <ImageIcon size={20} />}
                    {loading ? "Creating..." : "Generate"}
                </button>
            </form>

            {/* Display Section */}
            <div className='aspect-video bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700 relative group'>
                {loading ? (
                    <div className='text-center'>
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-2" />
                        <p className='text-gray-500 text-sm'>AI is painting your masterpiece...</p>
                    </div>
                ) : image ? (
                    <>
                        <img src={image} alt="Generated" className='w-full h-full object-contain' />
                        {/* Download Button Overlay */}
                        <a 
                            href={image} 
                            target="_blank" 
                            download 
                            className='absolute bottom-4 right-4 bg-white/90 text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'
                            title="Open Full Size"
                        >
                            <Download size={20} />
                        </a>
                    </>
                ) : (
                    <div className='text-gray-400 flex flex-col items-center'>
                        <ImageIcon size={48} className="mb-2 opacity-20" />
                        <p>No image generated yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageGenerator