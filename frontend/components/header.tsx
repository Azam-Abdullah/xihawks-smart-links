'use client';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { logout } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
  }
`;

const SiteTitle = styled.h1`
  font-size: 1.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  background: ${props => (props.$primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent')};
  color: ${props => (props.$primary ? 'white' : '#667eea')};
  border-color: ${props => (props.$primary ? 'transparent' : '#667eea')};

  &:hover {
    background: ${props => (props.$primary ? 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)' : 'rgba(102, 126, 234, 0.1)')};
    box-shadow: ${props => (props.$primary ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none')};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.875rem;
    font-size: 0.85rem;
  }
`;

const Username = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 580px) {
    display: none;
  }
`;

const UsernameMobile = styled.span`
  display: none;

  @media (max-width: 580px) {
    display: block;
    font-weight: 600;
    color: #333;
    font-size: 0.85rem;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <HeaderContainer>
      <Link href='/'>
        <SiteTitle>Smart Link</SiteTitle>
      </Link>
      <ButtonGroup>
        {user ? (
          <>
            <Username>{user.username}</Username>
            <UsernameMobile>{user.username}</UsernameMobile>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/signup">
              <Button $primary>Sign Up</Button>
            </Link>
          </>
        )}
      </ButtonGroup>
    </HeaderContainer>
  );
}