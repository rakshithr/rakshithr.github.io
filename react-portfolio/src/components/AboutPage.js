import React from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { DarkTheme } from './Themes';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';
import BigTitle from '../subComponents/BigTitlte'
import astronaut from '../assets/Images/spaceman.png'
import { profile } from '../data/profile'

const Box = styled.div`
background-color: ${props => props.theme.body};
width: 100vw;
min-height:100vh;
position: relative;
overflow-x: hidden;
overflow-y: auto;
padding-bottom: 3rem;
`
const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }
`
const Spaceman = styled.div`
position: absolute;
top: 10%;
right: 5%;
width: 20vw;
animation: ${float} 4s ease infinite;
img{
    width: 100%;
    height: auto;
}
`
const Main =  styled.div`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: min(50vw, 720px);
  min-height: 40vh;
  z-index: 3;
  line-height: 1.6;
  font-size: calc(0.6rem + 1vw);
 backdrop-filter: blur(4px);
  position: relative;
  margin: 10rem calc(5rem + 5vw) 2rem;
  font-family: 'Ubuntu Mono', monospace;
  font-style: italic;
`

const HighlightList = styled.ul`
  margin: 1rem 0 1rem 1.25rem;
  font-style: normal;
  font-family: 'Karla', sans-serif;
  font-size: calc(0.55rem + 0.85vw);
  li {
    margin-bottom: 0.5rem;
  }
`

const AboutPage = () => {
    const { about, highlights } = profile;
    return (
        <ThemeProvider theme={DarkTheme}>
<Box>

<LogoComponent theme='dark'/>
<SocialIcons theme='dark'/>
<PowerButton />
<ParticleComponent theme='dark' />

        <Spaceman>
            <img src={astronaut} alt="spaceman" />
        </Spaceman>    
        <Main>
        {about.summary}
<br /> <br/>
{about.current}
<br /> <br/>
<strong>Highlights</strong>
<HighlightList>
{highlights.map((item, i) => (
  <li key={i}>{item}</li>
))}
</HighlightList>
<strong>Education</strong><br />
{about.education}
<br /> <br/>
<strong>Certifications</strong><br />
{about.certifications}
<br /> <br/>
<strong>Honors &amp; awards</strong><br />
{about.awards}
        </Main>

        <BigTitle text="ABOUT" top="10%" left="5%" />


        </Box>

        </ThemeProvider>
        
    )
}

export default AboutPage
