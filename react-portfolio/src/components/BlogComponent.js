import { motion } from 'framer-motion'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const Box = styled(motion(NavLink))`
width: 100%;
text-decoration: none;
min-height: 18rem;
padding: 1rem;
color: ${props => props.theme.text};
border: 1px solid ${props => props.theme.glassBorder};
background: ${props => props.theme.glass};
backdrop-filter: blur(10px);
border-radius: 12px;
cursor: pointer;
display: flex;
flex-direction: column;
z-index:5;
transition: all 0.25s ease;
&:hover{
    border-color: ${props => props.theme.accent};
    box-shadow: 0 0 28px rgba(0, 229, 255, 0.12);
}
`

const Image = styled.div`
background-image: ${props => `url(${props.img})`};
width:100%;
height: 140px;
background-size: contain;
background-repeat: no-repeat;
border: 1px solid transparent;
background-position: left center;
background-color: rgba(255,255,255,0.04);
border-radius: 8px;
margin-bottom: 0.75rem;
`

const Title = styled.h3`
color: inherit;
padding: 0.25rem 0;
font-family: 'Karla',sans-serif;
font-weight:700;
font-size: 1.1rem;
border-bottom: 1px solid ${props => props.theme.glassBorder};
padding-bottom: 0.5rem;
`

const HashTags = styled.div`
padding: 0.5rem 0;
font-size: 0.8rem;
color: ${props => props.theme.muted};
`

const Tag= styled.span`
padding-right: 0.5rem;
&::after {
  content: "·";
  margin-left: 0.35rem;
  opacity: 0.5;
}
&:last-child::after {
  content: "";
}
`

const Date = styled.span`
padding:0.5rem 0;
font-family: ${props => props.theme.mono};
font-size: 0.7rem;
color: ${props => props.theme.accent};
`

const Container = styled(motion.div)``;

const Item = {
    hidden:{ scale: 0.95, opacity: 0 },
    show:{
        scale: 1,
        opacity: 1,
        transition: { type: 'spring', duration: 0.45 }
    }
}

const BlogComponent = (props) => {
    const {name, tags, date, imgSrc, link} = props.blog;
    return (
        <Container variants={Item}>
            <Box target="_blank" to={{pathname: link}}>
            <Image img={imgSrc} />
            <Title>{name}</Title>
            <HashTags>
                {tags.map((t,id) => <Tag key={id}>{t}</Tag>)}
            </HashTags>
            <Date>{date}</Date>
        </Box>
        </Container>
    )
}

export default BlogComponent
