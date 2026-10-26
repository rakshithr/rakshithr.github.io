import React from 'react'
import styled from 'styled-components'
import FuturisticShell from './futuristic/FuturisticShell'
import { profile } from '../data/profile'

const PageTitle = styled.h1`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin-bottom: 0.5rem;
`

const Sub = styled.p`
  color: ${(p) => p.theme.muted};
  margin-bottom: 2rem;
  max-width: 40rem;
`

const Grid = styled.div`
  display: grid;
  gap: 1rem;
`

const Card = styled.div`
  border: 1px solid ${(p) => p.theme.glassBorder};
  background: ${(p) => p.theme.glass};
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  h3 {
    font-family: ${(p) => p.theme.mono};
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${(p) => p.theme.accent};
    margin-bottom: 0.5rem;
  }
  p {
    color: ${(p) => p.theme.muted};
    line-height: 1.6;
    font-size: 0.95rem;
  }
`

const MySkillsPage = () => {
    const { skills } = profile;
    return (
        <FuturisticShell>
            <PageTitle>Systems</PageTitle>
            <Sub>{skills.intro}</Sub>
            <Grid>
                {skills.layers.map((layer) => (
                    <Card key={layer.title}>
                        <h3>{layer.title}</h3>
                        <p>{layer.items}</p>
                    </Card>
                ))}
                <Card>
                    <h3>Tools</h3>
                    <p>{skills.tools}</p>
                </Card>
            </Grid>
        </FuturisticShell>
    )
}

export default MySkillsPage
