import React from 'react'
import styled from 'styled-components'
import FuturisticShell from './futuristic/FuturisticShell'
import { profile } from '../data/profile'

const Panel = styled.div`
  border: 1px solid ${(p) => p.theme.glassBorder};
  background: ${(p) => p.theme.glass};
  backdrop-filter: blur(12px);
  border-radius: 14px;
  padding: 2rem;
  line-height: 1.7;
  font-size: 1rem;
  color: ${(p) => p.theme.muted};
  strong {
    display: block;
    color: ${(p) => p.theme.accent};
    font-family: ${(p) => p.theme.mono};
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin: 1.5rem 0 0.5rem;
  }
  strong:first-of-type {
    margin-top: 0;
  }
`

const PageTitle = styled.h1`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin-bottom: 1.5rem;
  color: ${(p) => p.theme.text};
`

const HighlightList = styled.ul`
  margin: 0.5rem 0 0 1.25rem;
  li {
    margin-bottom: 0.5rem;
  }
`

const AboutPage = () => {
    const { about, highlights } = profile;
    return (
        <FuturisticShell>
            <PageTitle>About</PageTitle>
            <Panel>
                {about.summary}
                <br /><br />
                {about.current}
                <strong>Highlights</strong>
                <HighlightList>
                    {highlights.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </HighlightList>
                <strong>Education</strong>
                {about.education}
                <strong>Certifications</strong>
                {about.certifications}
                <strong>Honors &amp; awards</strong>
                {about.awards}
            </Panel>
        </FuturisticShell>
    )
}

export default AboutPage
