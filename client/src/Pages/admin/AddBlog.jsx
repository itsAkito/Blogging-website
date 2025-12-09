import React, { useState, useRef, useEffect } from 'react'
import { assets, blogCategories } from '../../assets/assets.js'
import Quill from 'quill'
import 'quill/dist/quill.snow.css' // Ensure CSS is imported
import { useAppContext } from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'
import { Upload, Type, Layers, Sparkles, Save, Image as ImageIcon, Loader2 } from 'lucide-react'
import ImageGenerator from './imageGenerate.jsx'
const AddBlog = () => {
  const { axios, token } = useAppContext();

  // Form State
  const [image, setImage] = useState(null) // Stores the File object
  const [previewUrl, setPreviewUrl] = useState(null) // Stores the visual preview
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  // Loading States
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Refs
  const editorRef = useRef()
  const quillRef = useRef()

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  // --- AI CONTENT GENERATION ---
  const generateContent = async () => {
    if (!title) {
      toast.error("Please enter a Blog Title first so the AI knows what to write about.");
      return;
    }

    setIsGenerating(true);
    try {
      // 1. REAL CALL: Uncomment this when your backend AI route is ready
      /*
      const { data } = await axios.post('/api/ai/generate-blog', 
        { prompt: `Write a detailed blog post about: ${title}` },
        { headers: { Authorization: token } }
      );
      if(data.success) {
         quillRef.current.root.innerHTML = data.content;
         toast.success("AI Content Generated!");
      }
      */

      // 2. SIMULATION (For UI Demo):
      setTimeout(() => {
        const aiMockContent = `
          <h2>Introduction</h2>
          <p>This is an AI-generated draft based on your title: <strong>${title}</strong>.</p>
          <p>Here you can discuss the core concepts of ${category}...</p>
          <h2>Key Takeaways</h2>
          <ul>
            <li>Point 1: Understanding the basics.</li>
            <li>Point 2: Deep dive into the details.</li>
          </ul>
          <p><em>(Edit this text to finish your article)</em></p>
        `;
        // Append to existing content or replace? Here we replace.
        quillRef.current.root.innerHTML = aiMockContent;
        toast.success("Draft generated! You can now edit it.");
        setIsGenerating(false);
      }, 2000);

    } catch (error) {
      toast.error("AI Generation failed. Try again.");
      setIsGenerating(false);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) return toast.error("Please upload a thumbnail");

    try {
      setIsAdding(true);
      const formData = new FormData();
      formData.append('image', image)
      formData.append('title', title)
      formData.append('subTitle', subTitle);
      formData.append('description', quillRef.current.root.innerHTML); // Get HTML from Quill
      formData.append('category', category);
      formData.append('isPublished', isPublished)

      const { data } = await axios.post('/api/add/blogs', formData, {
        headers: { Authorization: token } // Ensure admin token is sent
      });

      if (data.success) {
        toast.success(data.message)
        // Reset Form
        setImage(null)
        setPreviewUrl(null)
        setTitle('')
        setSubTitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
        setIsPublished(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
  }

  // Initialize Quill
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your story here...',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
          ]
        }
      })
    }
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 transition-colors duration-300'>
      <form onSubmit={onSubmitHandler} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN: Thumbnail + Details --- */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
              <ImageIcon size={18} /> Thumbnail
            </h3>
            <label htmlFor="image-upload" className="cursor-pointer group relative block aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-dashed hover:border-blue-500 transition-colors">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Upload size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Click to upload</span>
                </div>
              )}
              <input onChange={handleImageChange} type="file" id="image-upload" accept="image/*" hidden />
            </label>

            {/* ImageGenerator should be a div with button actions */}
            <div className="mt-4">
              <ImageGenerator
                onImageGenerated={(fileObject) => {
                  setImage(fileObject);
                  setPreviewUrl(URL.createObjectURL(fileObject));
                }}
              />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border space-y-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <Layers size={18} /> Details
            </h3>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Category</label>
              <select
                onChange={e => setCategory(e.target.value)}
                value={category}
                className="w-full p-3 bg-gray-50 dark:bg-gray-900 border rounded-lg outline-none focus:border-blue-500 transition-colors text-gray-700 dark:text-gray-200"
              >
                {blogCategories.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Public Status</span>
              <label className="relative inline-flex items-center cursor-pointer" aria-label="Toggle publish status">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Title + Editor --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Inputs */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border space-y-4">
            <input
              type="text"
              placeholder="Article Title"
              required
              className="w-full text-3xl font-bold placeholder-gray-300 dark:placeholder-gray-600 text-gray-900 dark:text-white border-none outline-none bg-transparent"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              type="text"
              placeholder="Subtitle or short description..."
              required
              className="w-full text-lg text-gray-500 dark:text-gray-400 border-none outline-none bg-transparent"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
            />
          </div>

          {/* Quill Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border overflow-hidden relative min-h-[500px] flex flex-col">
            <button
              type="button"
              onClick={generateContent}
              disabled={isGenerating}
              className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? "Writing..." : "AI Auto-Write"}
            </button>
            <div ref={editorRef} className="flex-1 h-full text-lg dark:text-gray-200 q-editor-custom"></div>
          </div>
        </div>
      </form>
      {/* CSS Override for Dark Mode Quill */}
      <style>{`
        .ql-toolbar {
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          border-bottom: 1px solid #e5e7eb !important;
          background-color: transparent;
        }
        .dark .ql-toolbar {
          border-color: #374151 !important;
        }
        .dark .ql-stroke {
          stroke: #9ca3af !important;
        }
        .dark .ql-picker {
          color: #9ca3af !important;
        }
        .ql-container {
          border: none !important;
          font-family: inherit !important;
        }
        .ql-editor {
          min-height: 400px;
          padding: 1.5rem;
        }
      `}</style>
    </div>
  )
}

export default AddBlog