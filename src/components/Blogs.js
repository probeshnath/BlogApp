import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInput, setBlogData } from '../features/userSlice';
import '../styling/blogs.css'


const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=61b9725b19a60b536fa508ccf3143a65`

    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(blog_url).then((response) => {
            dispatch(setBlogData(response.data))
            setBlogs(response.data)
            setLoading(false)
        })
            .catch((error) => {
                console.log(error)
            })
    }, [searchInput])
    return (
        <div className='blog__page'>
            <h1 className='blog__page__header'>Blogs</h1>
            {loading ? <h1 className='loading'>Loading....</h1> : ""}
            <div className="blogs">
                {blogs?.articles?.map(blog => (
                    <>
                        <a href={blog.url} className='blog' target='blank'>
                            <img src={blog.image} alt="pic" />

                            <div>
                                <h3 className='sourceName'>
                                    <span>{blog.source.name}</span>
                                    <span>{blog.publishedAt}</span>
                                </h3>
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                        </a>

                    </>
                ))}

                {blogs?.totalArticles == 0 && (
                    <h1 className='no__blogs'>
                        No blogs avaliable here...Search somethis in greatest platform
                    </h1>
                )}
            </div>
        </div>
    )
}

export default Blogs
