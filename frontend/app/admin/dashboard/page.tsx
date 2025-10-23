'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SiteLink } from '@/types';
import SiteLinkForm from '@/components/site-link-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { logout } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import SiteLinkTable from '@/components/site-link-table';

export default function SiteLinkManagementPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (!user) {
      router.replace('/login'); // redirect immediately if logged out
    }
  }, [user, router]);

  const [siteLinks, setSiteLinks] = useState<SiteLink[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<SiteLink | null>(null);
  const [formData, setFormData] = useState<Omit<SiteLink, 'created_at' | 'updated_at'>>({
    id: 0,
    site_url: '',
    title: '',
    cover_image: '',
    description: '',
    category: '',
  });
  const [formLoading, setFormLoading] = useState(false);


  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  useEffect(() => {
    fetchSiteLinks();
  }, []);

  const fetchSiteLinks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/site-links`, { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSiteLinks(data.siteLinks || []);
    } catch (error) {
      console.error('Failed to fetch site links:', error);
      showMessage('Failed to load site links', 'error');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): string | null => {
    const urlPattern = /^(https?:\/\/)?([A-Za-z0-9.-]+\.[A-Za-z]{2,})(\/[^\s]*)?$/i;
    if (!formData.site_url.trim()) return 'Site URL is required.';
    if (!urlPattern.test(formData.site_url)) return 'Invalid site URL format.';
    if (!formData.title.trim()) return 'Title is required.';
    if (!formData.description.trim()) return 'Description is required.';
    if (!formData.category.trim()) return 'Category is required.';
    if (formData.cover_image && !urlPattern.test(formData.cover_image)) return 'Invalid cover image URL.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const validationError = validateForm();
    if (validationError) {
      showMessage(validationError, 'error');
      setFormLoading(false);
      return;
    }

    try {
      const isUpdate = formData.id !== 0;
      const url = isUpdate
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/site-links/${formData.id}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/site-links`;

      const res = await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        showMessage(err.message || 'Failed to save site link', 'error');
        setFormLoading(false);
        return;
      }

      showMessage(isUpdate ? 'Site link updated successfully' : 'Site link created successfully', 'success');

      setFormData({ id: 0, site_url: '', title: '', cover_image: '', description: '', category: '' });
      setEditingLink(null);
      await fetchSiteLinks();
    } catch (error) {
      console.error('Submit failed:', error);
      showMessage('Failed to save site link', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this site link?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/site-links/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        showMessage(err.message || 'Failed to delete site link', 'error');
        return;
      }

      showMessage('Site link deleted successfully', 'success');
      setSiteLinks((prev) => prev.filter((link) => link.id !== id));

      if (formData.id === id) {
        setFormData({ id: 0, site_url: '', title: '', cover_image: '', description: '', category: '' });
        setEditingLink(null);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      showMessage('Failed to delete site link', 'error');
    }
  };

  const handleEdit = (link: SiteLink) => {
    setFormData({ id: link.id, site_url: link.site_url, title: link.title, cover_image: link.cover_image || '', description: link.description, category: link.category });
    setEditingLink(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setFormData({ id: 0, site_url: '', title: '', cover_image: '', description: '', category: '' });
    setEditingLink(null);
  };

  const handleLogout = () => {
    router.push('/')
    dispatch(logout())
  }

  return (
    <Container>
      <Header>
        <Title>Admin Dashboard</Title>
        <LogoutButton onClick={handleLogout}>
          Logout
        </LogoutButton>
      </Header>

      {message && (
        <Message type={message.type}>
          {message.text}
        </Message>
      )}

      <SiteLinkForm
        formData={formData}
        setFormData={setFormData}
        formLoading={formLoading}
        editingLink={editingLink}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />

      <Section>
        <SectionTitle>Site Links List</SectionTitle>
        <SiteLinkTable
          siteLinks={siteLinks}
          loading={loading}
          editingLink={editingLink}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Section>
    </Container>
  );
}


const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const LogoutButton = styled.button`
  padding: 0.625rem 1.5rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.938rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  background-color: ${props => props.type === 'success' ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.type === 'success' ? '#166534' : '#991b1b'};
  border-left: 4px solid ${props => props.type === 'success' ? '#16a34a' : '#dc2626'};
`;

const Section = styled.section`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;