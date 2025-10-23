"use client";

import { useState, useEffect, FormEvent } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store";
import { EyeIcon, EyeOffIcon } from "lucide-react";


export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);


  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("useEffect fired", { user });
    if (user) {
      console.log("Redirecting to:", user.role === "admin" ? "/admin/dashboard" : "/");
      router.push(user.role === "admin" ? "/admin/dashboard" : "/");
    }
  }, [user]);

  const validate = (): boolean => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(loginUser({ email, password }));
  };

  return (
    <Container>
      <FormWrapper>
        <Header>
          <Title>Welcome Back</Title>
          <Subtitle>Log in to your account</Subtitle>
        </Header>

        {error && <ErrorBanner>{error}</ErrorBanner>}

        <form onSubmit={handleSubmit} noValidate>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              hasError={!!emailError}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <ErrorText>{emailError}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                hasError={!!passwordError}
                onChange={(e) => setPassword(e.target.value)}
              />
            <EyeButton type="button" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
              </EyeButton>
            </PasswordWrapper>
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </FormWrapper>
    </Container>
  );
}

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
`;

const FormWrapper = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #6b7280;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
}) <{ hasError?: boolean }>`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1.5px solid ${(props) => (props.hasError ? "#ef4444" : "#e5e7eb")};
  border-radius: 10px;
  font-size: 0.95rem;
  color: #1a1a1a;
  background: #ffffff;
  transition: all 0.2s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? "#ef4444" : "#667eea")};
    outline: none;
    box-shadow: 0 0 0 3px ${(props) => (props.hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(102, 126, 234, 0.1)")};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorBanner = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-align: center;
`;

const ErrorText = styled.p`
  color: #ef4444;
  margin: 0.375rem 0 0 0;
  font-size: 0.85rem;
`;