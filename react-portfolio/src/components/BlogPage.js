import React from 'react'
import styled from 'styled-components'
import {Blogs} from '../data/BlogData';
import BlogComponent from './BlogComponent'
import FuturisticShell from './futuristic/FuturisticShell'

const PageTitle = styled.h1`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin-bottom: 2rem;
`

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
grid-gap: 1.5rem;
`

const BlogPage = () => {
    return (
        <FuturisticShell wide>
            <PageTitle>Experience</PageTitle>
            <Grid>
                {Blogs.map(blog => (
                    <BlogComponent key={blog.id} blog={blog} />
                ))}
            </Grid>
        </FuturisticShell>
    )
}

export default BlogPage
