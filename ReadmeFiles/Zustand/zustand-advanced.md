# Zustand Advanced: Async Operations & Complex Patterns

## Async Actions

### Basic Async Pattern
```typescript
interface UserStore {
  users: User[]
  isLoading: boolean
  fetchUsers: () => Promise<void>
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  isLoading: false,
  
  fetchUsers: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/users')
      const users = await response.json()
      set({ users, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      console.error('Failed to fetch users:', error)
    }
  }
}))
```

## Real-World Example: Authentication Store

Based on your project's `useAuthStore`:

```typescript
interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (credentials: LoginData) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  
  login: async (credentials) => {
    set({ isLoading: true })
    try {
      const response = await api.post('/auth/login', credentials)
      set({ user: response.data, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },
  
  logout: async () => {
    try {
      await api.post('/auth/logout')
      set({ user: null })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  },
  
  checkAuth: async () => {
    set({ isLoading: true })
    try {
      const response = await api.get('/auth/check')
      set({ user: response.data })
    } catch (error) {
      set({ user: null })
    } finally {
      set({ isLoading: false })
    }
  }
}))
```

## Advanced Patterns

### 1. Computed Values
```typescript
const useStore = create((set, get) => ({
  items: [],
  filter: 'all',
  
  get filteredItems() {
    const { items, filter } = get()
    return filter === 'all' ? items : items.filter(item => item.status === filter)
  }
}))
```

### 2. Nested State Updates
```typescript
const useStore = create((set) => ({
  user: { profile: { name: '', email: '' } },
  
  updateProfile: (updates) => set((state) => ({
    user: {
      ...state.user,
      profile: { ...state.user.profile, ...updates }
    }
  }))
}))
```

### 3. Multiple Store Communication
```typescript
// Store A
const useAuthStore = create((set, get) => ({
  user: null,
  logout: () => {
    set({ user: null })
    // Clear other stores on logout
    useChatStore.getState().clearMessages()
  }
}))

// Store B
const useChatStore = create((set) => ({
  messages: [],
  clearMessages: () => set({ messages: [] })
}))
```

## Error Handling Patterns

### With Try-Catch
```typescript
const useStore = create((set) => ({
  data: null,
  error: null,
  isLoading: false,
  
  fetchData: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await api.getData()
      set({ data, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  }
}))
```

### With Status Tracking
```typescript
type Status = 'idle' | 'loading' | 'success' | 'error'

const useStore = create((set) => ({
  status: 'idle' as Status,
  data: null,
  error: null,
  
  fetchData: async () => {
    set({ status: 'loading' })
    try {
      const data = await api.getData()
      set({ status: 'success', data })
    } catch (error) {
      set({ status: 'error', error })
    }
  }
}))
```

## Performance Tips

1. **Use selective subscriptions** for frequently changing state
2. **Separate concerns** into different stores
3. **Avoid deep nesting** in state structure
4. **Use get() sparingly** in actions - prefer parameters