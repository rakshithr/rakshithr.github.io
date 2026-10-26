import { motion } from 'framer-motion';
import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Github } from '../components/AllSvgs';

const Box = styled(motion.li)`
width: 100%;
min-height: 280px;
background: ${props => props.theme.glass};
color: ${props => props.theme.text};
padding: 1.5rem;
border-radius: 12px;
display: flex;
flex-direction: column;
justify-content: space-between;
border: 1px solid ${props => props.theme.glassBorder};
transition: all 0.25s ease;
list-style: none;
&:hover{
  border-color: ${props => props.theme.accent};
  box-shadow: 0 0 28px rgba(0, 229, 255, 0.12);
}
`
const Title = styled.h2`
font-size: 1.15rem;
color: ${props => props.theme.text};
`

const Description = styled.p`
font-size: 0.9rem;
font-family: 'Karla',sans-serif;
font-weight: 400;
line-height: 1.5;
color: ${props => props.theme.muted};
`
const Tags = styled.div`
border-top: 1px solid ${props =>props.theme.glassBorder};
padding-top: 0.75rem;
display:flex;
flex-wrap:wrap;
gap: 0.35rem;
`
const Tag = styled.span`
font-size: 0.75rem;
font-family: ${props => props.theme.mono};
color: ${props => props.theme.accent2};
`

const Footer = styled.footer`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 0.75rem;
`

const Link = styled(NavLink)`
font-family: ${props =>props.theme.mono};
font-size: 0.75rem;
color: ${props =>props.theme.accent};
text-decoration: none;
padding: 0.4rem 0.75rem;
border: 1px solid ${props => props.theme.glassBorder};
border-radius: 6px;
&:hover {
  background: rgba(0, 229, 255, 0.1);
}
`

const Git = styled(NavLink)`
color: ${props => props.theme.accent};
text-decoration: none;
`

const Item = {
    hidden:{ scale:0.95, opacity: 0 },
    show:{
        scale:1,
        opacity: 1,
        transition: { type: 'spring', duration: 0.45 }
    }
}

const Card = (props) => {
    const {id, name, description, tags, demo, github} = props.data;
    return (
        <Box key={id} variants={Item} initial="hidden" animate="show">
            <div>
            <Title>{name}</Title>
            <Description>{description}</Description>
            </div>
            <Tags>
                {tags.map((t, tid) => <Tag key={tid}>#{t}</Tag>)}
            </Tags>
            <Footer>
                <Link to={{pathname: `${demo}`}} target="_blank">Visit</Link>
                <Git to={{pathname: `${github}`}} target="_blank">
                    <Github width={28} height={28} fill="currentColor" />
                </Git>
            </Footer>
        </Box>
    )
}

export default Card
