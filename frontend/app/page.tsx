'use client';
import styled from "styled-components";
import { useEffect, useState } from "react";
import SiteLinkList from "@/components/site-link-list";
import { SiteLink } from "@/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  font-family: Arial, sans-serif;
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    font-size: 3.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 4.5rem;
  }
`;

const SubHeader = styled.p`
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 1rem;
  text-align: center;
  max-width: 600px;

  @media (min-width: 640px) {
    font-size: 1.05rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: #95a5a6;
  text-align: center;
  padding: 3rem 1rem;
`;

export default function Home() {
  const [siteLinks, setSiteLinks] = useState<SiteLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteLinks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/site-links`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSiteLinks(data.siteLinks || []);
      } catch (error) {
        console.error("Failed to fetch site links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteLinks();
  }, []);

  return (
    <Container>
      <Header>Smart Links</Header>

      <SubHeader>Explore a curated collection of useful links at a glance.</SubHeader>

      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <SiteLinkList siteLinks={siteLinks} />
      )}

      <SubHeader>Check back regularly to see new links added daily.</SubHeader>
    </Container>
  );
}