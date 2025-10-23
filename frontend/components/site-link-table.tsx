'use client';

import { SiteLink } from '@/types';
import { useState, useMemo } from 'react';
import styled from 'styled-components';

interface SiteLinkTableProps {
  siteLinks: SiteLink[];
  loading: boolean;
  editingLink: SiteLink | null;
  handleEdit: (link: SiteLink) => void;
  handleDelete: (id: number) => void;
}

export default function SiteLinkTable({
  siteLinks,
  loading,
  editingLink,
  handleEdit,
  handleDelete,
}: SiteLinkTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = siteLinks.map(link => link.category || 'Uncategorized');
    return ['all', ...Array.from(new Set(cats))];
  }, [siteLinks]);

  // Filter links based on search and category
  const filteredLinks = useMemo(() => {
    return siteLinks.filter(link => {
      const matchesSearch = 
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.site_url.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === 'all' || 
        (link.category || 'Uncategorized') === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [siteLinks, searchTerm, categoryFilter]);

  if (loading) return <LoadingMessage>Loading site links...</LoadingMessage>;
  
  return (
    <Container>
      <FilterBar>
        <SearchInput
          type="text"
          placeholder="Search by title or URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </Select>
      </FilterBar>

      {filteredLinks.length === 0 ? (
        <EmptyMessage>
          {searchTerm || categoryFilter !== 'all' 
            ? 'No site links match your filters.' 
            : 'No site links found.'}
        </EmptyMessage>
      ) : (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Site Details</Th>
                <Th>Category</Th>
                <Th>Created</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredLinks.map((link) => (
                <Tr key={link.id} $isEditing={editingLink?.id === link.id}>
                  <Td>
                    <Title>{link.title}</Title>
                    <Url>{link.site_url}</Url>
                    <Description>{link.description}</Description>
                  </Td>
                  <Td>
                    <Category>{link.category || 'Uncategorized'}</Category>
                  </Td>
                  <Td>
                    <Date>{`${link.created_at}`}</Date>
                  </Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        $variant="edit"
                        onClick={() => handleEdit(link)}
                      >
                        Change
                      </Button>
                      <Button
                        $variant="delete"
                        onClick={() => handleDelete(link.id)}
                      >
                        Remove
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #f9fafb;
`;

const Th = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr<{ $isEditing?: boolean }>`
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.15s;
  
  ${props => props.$isEditing && `
    background-color: #eff6ff;
    box-shadow: inset 0 0 0 2px #3b82f6;
  `}
  
  &:hover {
    background-color: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
`;

const Title = styled.div`
  font-weight: 500;
  color: #111827;
`;

const Url = styled.div`
  color: #4b5563;
  word-break: break-all;
  margin-top: 0.25rem;
`;

const Description = styled.div`
  color: #6b7280;
  margin-top: 0.25rem;
`;

const Category = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #e0e7ff;
  color: #4338ca;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Date = styled.div`
  color: #9ca3af;
  font-size: 0.75rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button<{ $variant?: 'edit' | 'delete' }>`
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s;
  
  ${props => props.$variant === 'edit' ? `
    background-color: #3b82f6;
    color: white;
    
    &:hover {
      background-color: #2563eb;
    }
  ` : `
    background-color: #ef4444;
    color: white;
    
    &:hover {
      background-color: #dc2626;
    }
  `}
  
  &:active {
    transform: scale(0.95);
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const LoadingMessage = styled.p`
  text-align: center;
  padding: 2rem;
`;