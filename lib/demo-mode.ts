// Demo mode configuration
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true"

export const demoConfig = {
  // Bypass authentication in demo mode
  bypassAuth: DEMO_MODE,

  // Auto-approve payments in demo mode
  autoApprovePayments: DEMO_MODE,

  // Mock blockchain transactions in demo mode
  mockBlockchain: DEMO_MODE,

  // Show mock ad banners in demo mode
  showMockAds: DEMO_MODE,

  // Auto-generate profile views in demo mode
  mockProfileViews: DEMO_MODE,

  // Mock user data for demo
  mockUsers: DEMO_MODE,

  // Skip email verification in demo mode
  skipEmailVerification: DEMO_MODE,
}

// Mock data generators for demo mode
export const generateMockProfileViews = () => {
  if (!DEMO_MODE) return []

  return [
    { name: "John Doe", company: "Google", role: "Engineering Manager", time: "2h" },
    { name: "Lisa Wang", company: "Microsoft", role: "Product Manager", time: "5h" },
    { name: "David Park", company: "Apple", role: "Senior Engineer", time: "1d" },
    { name: "Sarah Kim", company: "Tesla", role: "Data Scientist", time: "2d" },
  ]
}

export const generateMockAds = () => {
  if (!DEMO_MODE) return []

  return [
    {
      id: "1",
      title: "Senior Product Manager",
      company: "Airbnb",
      location: "San Francisco, CA",
      type: "job",
      sponsored: true,
    },
    {
      id: "2",
      title: "Stanford Alumni Mixer",
      company: "Stanford Alumni Association",
      location: "Palo Alto, CA",
      type: "event",
      sponsored: true,
    },
  ]
}

// Demo authentication bypass
export const getDemoUser = () => {
  if (!DEMO_MODE) return null

  return {
    id: "demo_user_123",
    name: "Demo User",
    email: "demo@alumninexuspro.com",
    role: "Alumni",
    verified: true,
    school: "Demo University",
    company: "Demo Corp",
  }
}
