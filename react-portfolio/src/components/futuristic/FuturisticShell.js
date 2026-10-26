import React from "react";
import styled from "styled-components";
import FuturisticBackground from "./FuturisticBackground";
import TopNav from "./TopNav";
import SocialIcons from "../../subComponents/SocialIcons";

const Page = styled.div`
  position: relative;
  min-height: 100vh;
  color: ${(p) => p.theme.text};
  z-index: 1;
`;

const Content = styled.main`
  position: relative;
  padding: 5.5rem 1.5rem 3rem;
  max-width: ${(p) => (p.$wide ? "1200px" : "960px")};
  margin: 0 auto;
  z-index: 2;
`;

const FuturisticShell = ({ children, wide = false }) => (
  <Page>
    <FuturisticBackground />
    <TopNav />
    <SocialIcons theme="futuristic" />
    <Content $wide={wide}>{children}</Content>
  </Page>
);

export default FuturisticShell;
