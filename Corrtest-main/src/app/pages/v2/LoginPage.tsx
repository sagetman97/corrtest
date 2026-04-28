import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { PollyWordmark } from '../../components/PollyLogo';
import { PButton, PCard, PInput } from '../../components/polly';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../../components/Icon';

type LoginErrors = {
  email?: string;
  password?: string;
  form?: string;
};

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export function LoginPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const state = location.state as LocationState | undefined;
  const destination = state?.from?.pathname && state.from.pathname !== '/login' ? state.from.pathname : '/home';

  if (isAuthenticated) {
    return <Navigate to={destination} replace />;
  }

  function validate() {
    const nextErrors: LoginErrors = {};
    if (!email.trim()) nextErrors.email = 'Email is required';
    if (!password) nextErrors.password = 'Password is required';
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const ok = signIn(email, password);
    setIsSubmitting(false);

    if (!ok) {
      setErrors({
        form: 'Invalid email or password.',
      });
      return;
    }

    navigate(destination, { replace: true });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--colors-background-common-default-grey)]">
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/backgroundCSEL.png")',
          backgroundSize: 'min(1800px, 100vw) auto',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(245,247,252,0.28)_100%)]" />

      <div className="relative z-[1] mx-auto flex min-h-screen w-full max-w-[min(100%,92rem)] flex-col px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6 flex items-center justify-end gap-5 text-xs text-[var(--colors-text-icon-medium)]">
          <button type="button" className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">Need help?</button>
          <button type="button" className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]">Contact Support</button>
        </header>

        <div className="relative flex flex-1 items-center justify-center">
          <PCard
            className="w-full max-w-[27rem] border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] px-2 shadow-[var(--shadow-xl)]"
          >
            <div className="px-3 pb-3 pt-2 text-center">
              <div className="mb-5 flex justify-center">
                <PollyWordmark size={96} />
              </div>
              <p className="text-[1.6rem] font-semibold leading-tight text-[var(--colors-text-icon-dark)]">
                AI Correspondent Execution & Settlement Layer
              </p>
            </div>

            <form className="space-y-4 px-3 pb-3" onSubmit={handleSubmit} noValidate>
              <PInput
                name="email"
                type="email"
                label="Email"
                placeholder="name@company.com"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email || errors.form) setErrors((prev) => ({ ...prev, email: undefined, form: undefined }));
                }}
                error={errors.email}
                required
              />

              <PInput
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password || errors.form) setErrors((prev) => ({ ...prev, password: undefined, form: undefined }));
                }}
                error={errors.password}
                required
              />

              <div className="flex items-center justify-between gap-3 text-xs">
                <label className="flex cursor-pointer items-center gap-2 text-[var(--colors-text-icon-medium)]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded-[var(--border-radius-xs)] border border-[var(--colors-border-common-default)] accent-[var(--polly-blue-pricing)]"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-[var(--polly-blue-pricing)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colors-border-common-accent)]"
                >
                  Forgot password?
                </button>
              </div>

              {errors.form ? (
                <p className="rounded-[var(--border-radius-sm)] border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errors.form}
                </p>
              ) : null}

              <PButton
                type="submit"
                expand
                isLoading={isSubmitting}
                loadingText="Signing in..."
                className="bg-[var(--polly-blue-pricing)] text-white hover:brightness-95"
              >
                Sign in
              </PButton>
            </form>
          </PCard>
        </div>

        <footer className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--colors-text-icon-medium)]">
          <Icon name="shield" size={12} />
          <span>Enterprise grade security</span>
          <span className="text-[var(--colors-text-icon-placeholder)]">•</span>
          <span>SOC 2 Type II</span>
          <span className="text-[var(--colors-text-icon-placeholder)]">•</span>
          <span>GDPR Compliant</span>
        </footer>
      </div>
    </main>
  );
}
