// 'use client';

// import { SiteLink } from '@/types';
// import React from 'react';
// import styled from 'styled-components';

// interface SiteLinkFormProps {
//   formData: Omit<SiteLink, 'created_at' | 'updated_at'>;
//   setFormData: React.Dispatch<React.SetStateAction<Omit<SiteLink, 'created_at' | 'updated_at'>>>;
//   formLoading: boolean;
//   editingLink: SiteLink | null;
//   handleSubmit: (e: React.FormEvent) => Promise<void>;
//   handleCancel: () => void;
// }

// export default function SiteLinkForm({
//   formData,
//   setFormData,
//   formLoading,
//   editingLink,
//   handleSubmit,
//   handleCancel,
// }: SiteLinkFormProps) {
//   return (
//     <FormContainer>
//       <FormTitle>
//         {editingLink ? 'Edit Site Link' : 'Create New Site Link'}
//       </FormTitle>
//       <StyledForm onSubmit={handleSubmit}>
//         <FormGroup>
//           <Label>Site URL</Label>
//           <Input
//             type="url"
//             value={formData.site_url}
//             onChange={(e) => setFormData({ ...formData, site_url: e.target.value })}
//             placeholder="https://example.com"
//             disabled={formLoading}
//             required
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>Title</Label>
//           <Input
//             type="text"
//             value={formData.title}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             placeholder="Enter title"
//             disabled={formLoading}
//             required
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>Cover Image (optional)</Label>
//           <Input
//             type="url"
//             value={formData.cover_image}
//             onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
//             placeholder="https://example.com/image.jpg"
//             disabled={formLoading}
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>Description</Label>
//           <TextArea
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             placeholder="Enter description"
//             rows={3}
//             disabled={formLoading}
//             required
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>Category</Label>
//           <Input
//             type="text"
//             value={formData.category}
//             onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//             placeholder="Enter category"
//             disabled={formLoading}
//             required
//           />
//         </FormGroup>

//         <ButtonGroup>
//           {editingLink && (
//             <SecondaryButton
//               type="button"
//               onClick={handleCancel}
//               disabled={formLoading}
//             >
//               Cancel
//             </SecondaryButton>
//           )}
//           <PrimaryButton
//             type="submit"
//             disabled={formLoading}
//           >
//             {formLoading
//               ? editingLink
//                 ? 'Updating...'
//                 : 'Creating...'
//               : editingLink
//               ? 'Update Site Link'
//               : 'Create Site Link'}
//           </PrimaryButton>
//         </ButtonGroup>
//       </StyledForm>
//     </FormContainer>
//   );
// }

// const FormContainer = styled.div`
//   margin-bottom: 2rem;
// `;

// const FormTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 600;
//   margin-bottom: 1.5rem;
//   color: #1a202c;
// `;

// const StyledForm = styled.form`
//   background: #ffffff;
//   border-radius: 12px;
//   padding: 2rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   border: 1px solid #e2e8f0;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1.5rem;
// `;

// const Label = styled.label`
//   display: block;
//   font-size: 0.875rem;
//   font-weight: 500;
//   margin-bottom: 0.5rem;
//   color: #374151;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.625rem 0.875rem;
//   font-size: 0.938rem;
//   border: 1px solid #d1d5db;
//   border-radius: 8px;
//   transition: all 0.2s ease;
//   background: ${props => props.disabled ? '#f9fafb' : '#ffffff'};
  
//   &:focus {
//     outline: none;
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   }
  
//   &::placeholder {
//     color: #9ca3af;
//   }
  
//   &:disabled {
//     cursor: not-allowed;
//     color: #6b7280;
//   }
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.625rem 0.875rem;
//   font-size: 0.938rem;
//   border: 1px solid #d1d5db;
//   border-radius: 8px;
//   transition: all 0.2s ease;
//   font-family: inherit;
//   resize: vertical;
//   background: ${props => props.disabled ? '#f9fafb' : '#ffffff'};
  
//   &:focus {
//     outline: none;
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   }
  
//   &::placeholder {
//     color: #9ca3af;
//   }
  
//   &:disabled {
//     cursor: not-allowed;
//     color: #6b7280;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 0.75rem;
//   margin-top: 1.75rem;
// `;

// const Button = styled.button`
//   padding: 0.625rem 1.5rem;
//   font-size: 0.938rem;
//   font-weight: 500;
//   border-radius: 8px;
//   border: none;
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   &:disabled {
//     cursor: not-allowed;
//     opacity: 0.6;
//   }
// `;

// const PrimaryButton = styled(Button)`
//   background: #3b82f6;
//   color: white;
  
//   &:hover:not(:disabled) {
//     background: #2563eb;
//     transform: translateY(-1px);
//     box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
//   }
  
//   &:active:not(:disabled) {
//     transform: translateY(0);
//   }
// `;

// const SecondaryButton = styled(Button)`
//   background: #f3f4f6;
//   color: #374151;
  
//   &:hover:not(:disabled) {
//     background: #e5e7eb;
//   }
// `;

'use client';

import { SiteLink } from '@/types';
import React, { useState } from 'react';
import styled from 'styled-components';

interface SiteLinkFormProps {
  formData: Omit<SiteLink, 'created_at' | 'updated_at'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<SiteLink, 'created_at' | 'updated_at'>>>;
  formLoading: boolean;
  editingLink: SiteLink | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleCancel: () => void;
}

export default function SiteLinkForm({
  formData,
  setFormData,
  formLoading,
  editingLink,
  handleSubmit,
  handleCancel,
}: SiteLinkFormProps) {
  const [generatingDescription, setGeneratingDescription] = useState(false);

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.category) return;

    setGeneratingDescription(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/generate-description`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:"include",
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate description');
      }

      const data = await response.json();
      setFormData({ ...formData, description: data.description });
    } catch (error) {
      console.error('Error generating description:', error);
      alert('Failed to generate description. Please try again.');
    } finally {
      setGeneratingDescription(false);
    }
  };

  const isGenerateEnabled = formData.title.trim() !== '' && formData.category.trim() !== '';

  return (
    <FormContainer>
      <FormTitle>
        {editingLink ? 'Edit Site Link' : 'Create New Site Link'}
      </FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Site URL</Label>
          <Input
            type="url"
            value={formData.site_url}
            onChange={(e) => setFormData({ ...formData, site_url: e.target.value })}
            placeholder="https://example.com"
            disabled={formLoading}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter title"
            disabled={formLoading}
            required
          />
        </FormGroup>

                <FormGroup>
          <Label>Category</Label>
          <Input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Enter category"
            disabled={formLoading}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Cover Image (optional)</Label>
          <Input
            type="url"
            value={formData.cover_image}
            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
            placeholder="https://example.com/image.jpg"
            disabled={formLoading}
          />
        </FormGroup>

        <FormGroup>
          <LabelWithButton>
            <Label>Description</Label>
            <AIButton
              type="button"
              onClick={handleGenerateDescription}
              disabled={!isGenerateEnabled || generatingDescription || formLoading}
              title={!isGenerateEnabled ? 'Please enter title and category first' : 'Generate description with AI'}
            >
              {generatingDescription ? (
                <>
                  <Spinner />
                  Generating...
                </>
              ) : (
                <>
                  <AIIcon>✨</AIIcon>
                  Generate with AI
                </>
              )}
            </AIButton>
          </LabelWithButton>
          <TextArea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description or generate with AI"
            rows={3}
            disabled={formLoading}
            required
          />
        </FormGroup>

        <ButtonGroup>
          {editingLink && (
            <SecondaryButton
              type="button"
              onClick={handleCancel}
              disabled={formLoading}
            >
              Cancel
            </SecondaryButton>
          )}
          <PrimaryButton
            type="submit"
            disabled={formLoading}
          >
            {formLoading
              ? editingLink
                ? 'Updating...'
                : 'Creating...'
              : editingLink
              ? 'Update Site Link'
              : 'Create Site Link'}
          </PrimaryButton>
        </ButtonGroup>
      </StyledForm>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a202c;
`;

const StyledForm = styled.form`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const LabelWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const AIButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.813rem;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #d1d5db;
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: #f9fafb;
  }
`;

const AIIcon = styled.span`
  font-size: 1rem;
`;

const Spinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.938rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: ${props => props.disabled ? '#f9fafb' : '#ffffff'};
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:disabled {
    cursor: not-allowed;
    color: #6b7280;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.938rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-family: inherit;
  resize: vertical;
  background: ${props => props.disabled ? '#f9fafb' : '#ffffff'};
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:disabled {
    cursor: not-allowed;
    color: #6b7280;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.75rem;
`;

const Button = styled.button`
  padding: 0.625rem 1.5rem;
  font-size: 0.938rem;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const PrimaryButton = styled(Button)`
  background: #3b82f6;
  color: white;
  
  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background: #f3f4f6;
  color: #374151;
  
  &:hover:not(:disabled) {
    background: #e5e7eb;
  }
`;