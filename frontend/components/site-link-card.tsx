import { SiteLink } from "@/types";
import styled from "styled-components";

interface SiteLinkCardProps {
    link: SiteLink;
}

export function SiteLinkCard({ link }: SiteLinkCardProps) {
const imageUrl = link.cover_image || 'https://picsum.photos/800/200?blur=5';

    return (
        <Card href={link.site_url} target="_blank" rel="noopener noreferrer">
            <CardImage src={imageUrl} alt={link.title} />
            <CardContent>
                <CardHeader>
                    <CardTitle>{link.title}</CardTitle>
                    <Category>{link.category || 'General'}</Category>
                </CardHeader>
                <CardUrl>{link.site_url}</CardUrl>
                <CardDescription>{link.description}</CardDescription>
                <CardFooter>
                    <StyledDate>{new Date(link.created_at).toLocaleDateString()}</StyledDate>
                    <VisitButton>Visit site</VisitButton>
                </CardFooter>
            </CardContent>
        </Card>
    );
}

const Card = styled.a`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  height: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-color: #764ba2;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f3f4f6;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;
  line-height: 1.4;
`;

const Category = styled.span`
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background-color: #e0e7ff;
  color: #4338ca;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  margin-left: 0.5rem;
`;

const CardUrl = styled.div`
  color: #667eea;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  word-break: break-all;
`;

const CardDescription = styled.p`
  color: #6b7280;
  font-size: 0.938rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
`;

const StyledDate = styled.div`
  color: #9ca3af;
  font-size: 0.813rem;
`;

const VisitButton = styled.span`
  color: #667eea;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &::after {
    content: '→';
    transition: transform 0.2s;
  }
  
  ${Card}:hover &::after {
    transform: translateX(3px);
  }
`;