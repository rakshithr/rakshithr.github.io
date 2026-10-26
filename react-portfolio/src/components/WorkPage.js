import React from 'react'
import styled from 'styled-components'
import { Work } from "../data/WorkData";
import Card from '../subComponents/Card';
import FuturisticShell from './futuristic/FuturisticShell'

const PageTitle = styled.h1`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin-bottom: 2rem;
`

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 1.5rem;
  padding: 0;
`

const WorkPage = () => {
    return (
        <FuturisticShell wide>
            <PageTitle>Projects</PageTitle>
            <List>
                {Work.map(d => (
                    <Card key={d.id} data={d} />
                ))}
            </List>
        </FuturisticShell>
    )
}

export default WorkPage
