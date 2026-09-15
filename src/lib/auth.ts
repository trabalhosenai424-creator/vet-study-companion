export type VetProUser = {
  name: string;
  email: string;
  course?: string;
  semester?: string;
  goal?: string;
  onboardingComplete?: boolean;
};

const USER_KEY = "vetpro:user";

export function getCurrentUser(): VetProUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as VetProUser;
  } catch {
    window.localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function signIn(email: string, name: string) {
  const user: VetProUser = { name, email, onboardingComplete: false };
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function completeOnboarding(data: Pick<VetProUser, "course" | "semester" | "goal">) {
  const current = getCurrentUser();
  if (!current) return null;
  const user = { ...current, ...data, onboardingComplete: true };
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function signOut() {
  window.localStorage.removeItem(USER_KEY);
}
