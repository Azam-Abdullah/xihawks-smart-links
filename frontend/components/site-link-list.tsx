'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { SiteLinkCard } from './site-link-card';
import { SiteLink } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface SiteLinkListProps {
  siteLinks: SiteLink[];
  loading?: boolean;
}


export default function SiteLinkList({ siteLinks}: SiteLinkListProps) {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const itemsPerPage = 9;

  const categories = useMemo(() => {
    const cats = siteLinks.map(link => link.category || 'General');
    return ['all', ...Array.from(new Set(cats)).sort()];
  }, [siteLinks]);

  const filteredLinks = useMemo(() => {
    return siteLinks.filter(link => {
      const matchesCategory = 
        categoryFilter === 'all' || 
        (link.category || 'General') === categoryFilter;
      
      return matchesCategory;
    });
  }, [siteLinks, categoryFilter]);

  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLinks = filteredLinks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkScroll = (element: HTMLDivElement) => {
    setCanScrollLeft(element.scrollLeft > 0);
    setCanScrollRight(element.scrollLeft < element.scrollWidth - element.clientWidth - 1);
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <Container>

      <CategoryFilterWrapper>
        {canScrollLeft && (
          <ScrollButton $position="left" onClick={() => scrollCategories('left')}>
            ‹
          </ScrollButton>
        )}
        <CategoryScroll
          id="category-scroll"
          onScroll={(e) => checkScroll(e.currentTarget)}
        >
          {categories.map(cat => (
            <CategoryButton
              key={cat}
              $active={categoryFilter === cat}
              onClick={() => {
                setCategoryFilter(cat);
                setCurrentPage(1);
              }}
            >
              {cat === 'all' ? 'All' : cat}
            </CategoryButton>
          ))}
        </CategoryScroll>
        {canScrollRight && (
          <ScrollButton $position="right" onClick={() => scrollCategories('right')}>
            ›
          </ScrollButton>
        )}
      </CategoryFilterWrapper>

      {filteredLinks.length === 0 ? (
        <EmptyMessage>
          {categoryFilter !== 'all' 
            ? 'No sites in this category.' 
            : 'No sites available yet.'}
        </EmptyMessage>
      ) : (
        <>
          <CardsGrid>
            {currentLinks.map((link) => (
              <SiteLinkCard key={link.id} link={link} />
            ))}
          </CardsGrid>

          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft/>
              </PageButton>
              
              <PageNumbers>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PageButton
                    key={page}
                    $active={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PageButton>
                ))}
              </PageNumbers>
              
              <PageButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight/>
              </PageButton>
              
              <PageInfo>
                Page {currentPage} of {totalPages}
              </PageInfo>
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const CategoryFilterWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryScroll = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.5rem 0;
  flex: 1;
  
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled.button<{ $active?: boolean }>`
  padding: 0.625rem 1.25rem;
  border: 1px solid ${props => props.$active ? '#667eea' : '#d1d5db'};
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.15s;
  flex-shrink: 0;
  
  &:hover {
    background-color: ${props => props.$active ? '#2563eb' : '#f9fafb'};
    border-color: ${props => props.$active ? '#2563eb' : '#9ca3af'};
  }

  @media (min-width: 768px) {
    font-size: 0.938rem;
  }
`;

const ScrollButton = styled.button<{ $position: 'left' | 'right' }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #374151;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`;

const Pagination = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.$active ? '#3b82f6' : '#d1d5db'};
  background-color: ${props => props.$active ? '#3b82f6' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.95rem; /* slightly bigger for better visual balance */
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  svg {
    width: 1.5em;  /* scale chevrons slightly bigger than font */
    height: 1.5em;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.$active ? '#2563eb' : '#f9fafb'};
    border-color: ${props => props.$active ? '#2563eb' : '#9ca3af'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 0.5rem 0.875rem;
    font-size: 1rem; /* slightly bigger on larger screens */
  }
`;


const PageInfo = styled.span`
  color: #6b7280;
  font-size: 0.813rem;
  padding: 0.25rem 0.5rem;
  width: 100%;
  text-align: center;

  @media (min-width: 640px) {
    width: auto;
    font-size: 0.875rem;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
  font-size: 0.938rem;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
    font-size: 1rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
  font-size: 0.938rem;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
    font-size: 1rem;
  }
`;