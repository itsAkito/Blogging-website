import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Layout from './Pages/admin/Layout'
import AddBlog from './Pages/admin/AddBlog'
import DashBoard from './Pages/admin/DashBoard'
// import Layout from './Pages/admin/Layout'
import ListBlog from './Pages/admin/ListBlog'
import Comment from './Pages/admin/Comment'
import Login from './Pages/admin/Login'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import ImageGenerator from './Pages/admin/imageGenerate'

// import { useNavigate } from 'react-router-dom'
const App = () => {

  const { token } = useAppContext();


  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/admin/login' element={<Login />} />
        {/* <Route path='/admin' element={true ? <Layout /> : <Login />}>
          <Route index element={<DashBoard />} />
          <Route path='/addblog' element={<AddBlog />} />
          <Route path='/listblog' element={<ListBlog />} />
          <Route path='/comment' element={<Comment />} />
        </Route> */}
        <Route path='/admin' element={token ? <Layout /> : <Login />}>
          <Route index element={<DashBoard />} />
          <Route path='addblog' element={<AddBlog />} /> 
          <Route path="image-gen" element={<ImageGenerator/>} />     // ✅ Correct
          <Route path='listblog' element={<ListBlog />} />
          <Route path='comment' element={<Comment />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App