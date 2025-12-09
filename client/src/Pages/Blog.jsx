import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
// Import Icons for richer UI
import { Volume2, StopCircle, Share2, Sparkles, Copy, Check } from 'lucide-react'

const Blog = () => {
  const { id } = useParams()
  const { axios } = useAppContext()
  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  
  // State for new Rich Features
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [summary, setSummary] = useState('')
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Speech Synthesis Instance
  const speechHandler = new SpeechSynthesisUtterance()

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/add/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/add/comment', { blogId: id })
      if (data.success) {
        setComments(data.comments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const [content, setContent] = useState('')
  const [name, setName] = useState('')

  const addcomment = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/add/add-comment', { blog: id, name, content })
      if (data.success) {
        setName('')
        setContent('')
        toast.success("Comment Added!")
        // Functionality: Refresh comments immediately after adding
        fetchComments() 
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // --- RICH FEATURE: Text to Speech ---
  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      // Strip HTML tags for clean reading
      const cleanText = data.description.replace(/<[^>]+>/g, '')
      speechHandler.text = `${data.title}. ${cleanText}`
      speechHandler.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(speechHandler)
      setIsSpeaking(true)
    }
  }

  // --- RICH FEATURE: AI Summary Generation (Mocked for UI) ---
  const generateSummary = () => {
    if(summary) return; // Don't regenerate if already there
    setIsGeneratingSummary(true)
    
    // Simulate AI delay - In real app, call your /api/generate-summary endpoint here
    setTimeout(() => {
      // Mock logic: taking first 200 chars as summary
      const mockSummary = data.description.replace(/<[^>]+>/g, '').substring(0, 250) + "..."
      setSummary(mockSummary)
      setIsGeneratingSummary(false)
      toast.success("AI Summary Generated!")
    }, 1500)
  }

  // --- RICH FEATURE: Social Sharing ---
  const handleShare = (platform) => {
    const url = window.location.href
    const text = `Check out this article: ${data.title}`
    let shareUrl = ''

    switch(platform) {
      case 'copy':
        navigator.clipboard.writeText(url)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
        toast.success("Link copied to clipboard")
        return
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      default: return
    }
    window.open(shareUrl, '_blank')
  }

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id])

  return data ? (
    <div className='relative min-h-screen bg-gray-50'>
      <img src={assets.gradientBackground} alt=" " className='absolute top-0 w-full h-96 object-cover -z-10 opacity-30' />
      <Navbar />
      
      {/* Blog Header */}
      <div className='text-center mt-20 px-4'>
        <p className='text-blue-600 font-semibold tracking-wide uppercase text-sm'>
          Published on {Moment(data.createdAt).format('MMMM DD, YYYY')}
        </p>
        <h1 className='text-gray-900 text-3xl sm:text-5xl font-bold max-w-4xl mx-auto mt-4 leading-tight'>
          {data.title}
        </h1>
        <h2 className='text-gray-500 mt-4 text-lg max-w-2xl mx-auto'>
          {data.subTitle}
        </h2>
        
        <div className='flex items-center justify-center gap-3 mt-6'>
          <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
             <span className='font-bold text-gray-600'>AH</span>
          </div>
          <div className='text-left'>
            <p className='text-gray-900 font-medium text-sm'>Akito Hyun</p>
            <p className='text-gray-500 text-xs'>Author</p>
          </div>
        </div>
      </div>

      <div className='mx-5 max-w-4xl md:mx-auto my-10'>
        
        {/* Main Image */}
        <div className='relative group'>
          <img src={data.image} alt={data.title} className='w-full h-[400px] object-cover rounded-2xl shadow-lg mb-8 transition-transform duration-500 hover:scale-[1.01]' />
        </div>

        {/* --- NEW: Rich Action Bar --- */}
        <div className='flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 sticky top-20 z-20'>
          <div className='flex gap-4'>
            <button 
              onClick={handleSpeak}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${isSpeaking ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {isSpeaking ? <StopCircle size={18} /> : <Volume2 size={18} />}
              {isSpeaking ? 'Stop Listening' : 'Listen to Article'}
            </button>
            
            <button 
              onClick={generateSummary}
              disabled={isGeneratingSummary || summary}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${summary ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              <Sparkles size={18} />
              {isGeneratingSummary ? 'Generating...' : summary ? 'Summary Ready' : 'AI Summary'}
            </button>
          </div>

          <div className='flex gap-2 text-gray-500'>
             <button onClick={() => handleShare('copy')} className='p-2 hover:bg-gray-100 rounded-full tooltip'>
                {isCopied ? <Check size={20} className='text-green-600'/> : <Copy size={20}/>}
             </button>
             <button onClick={() => handleShare('twitter')} className='p-2 hover:bg-blue-50 rounded-full text-blue-400'>
                <Share2 size={20}/>
             </button>
          </div>
        </div>

        {/* --- NEW: AI Summary Box (Hidden until generated) --- */}
        {summary && (
          <div className='bg-blue-50 border border-blue-100 p-6 rounded-xl mb-8 animate-fade-in'>
            <h3 className='flex items-center gap-2 font-bold text-blue-800 mb-2'>
              <Sparkles size={16} /> AI Generated Summary
            </h3>
            <p className='text-blue-900 leading-relaxed'>{summary}</p>
          </div>
        )}

        {/* Content */}
        <div className='rich-text prose prose-lg max-w-none text-gray-700 leading-8' 
             dangerouslySetInnerHTML={{ __html: data.description }}>
        </div>

        {/* Engagement Section */}
        <div className='border-t border-gray-200 mt-16 pt-10'>
          <h3 className='text-2xl font-bold text-gray-900 mb-6'>Discussion ({comments?.length || 0})</h3>
          
          {/* Add Comment Form */}
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10'>
            <p className='font-medium text-gray-700 mb-4'>Leave a comment</p>
            <form className='flex flex-col gap-4' onSubmit={addcomment}>
              <div className='flex gap-4'>
                 <img src={assets.user_icon} className="w-10 h-10 rounded-full bg-gray-200 p-1"/>
                 <input 
                    type='text' 
                    placeholder='Your Name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors'
                 />
              </div>
              <textarea 
                placeholder='Share your thoughts...' 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className='w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition-colors'
              />
              <div className='flex justify-end'>
                <button type='submit' className='bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-transform active:scale-95'>
                  Post Comment
                </button>
              </div>
            </form>
          </div>

          {/* Comment List */}
          <div className='space-y-6'>
            {Array.isArray(comments) && comments.map((item) => (
              <div key={item._id} className='flex gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm'>
                <img src={assets.user_icon} alt='' className='w-10 h-10 opacity-70' />
                <div className='flex-1'>
                  <div className='flex justify-between items-start mb-2'>
                    <h4 className='font-bold text-gray-900'>{item.name}</h4>
                    <span className='text-xs text-gray-400'>{Moment(item.createdAt).fromNow()}</span>
                  </div>
                  <p className='text-gray-600 leading-relaxed'>{item.content}</p>
                </div>
              </div>
            ))}
            {Array.isArray (comments) && comments.length === 0 && (
               <p className='text-center text-gray-400 py-10'>No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>

        {/* Share Footer */}
        <div className='mt-20 border-t border-gray-200 pt-10 text-center'>
          <p className='text-gray-500 mb-6'>Share this article</p>
          <div className='flex justify-center gap-6 opacity-70 hover:opacity-100 transition-opacity'>
            <button onClick={() => handleShare('facebook')}><img src={assets.facebook_icon} width={40} className="hover:scale-110 transition-transform"/></button>
            <button onClick={() => handleShare('twitter')}><img src={assets.twitter_icon} width={40} className="hover:scale-110 transition-transform"/></button>
            <button onClick={() => handleShare('copy')}><img src={assets.googleplus_icon} width={40} className="hover:scale-110 transition-transform"/></button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : <Loader />
}

export default Blog