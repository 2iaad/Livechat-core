# Zustand Best Practices & Real-World Patterns

## Project Structure

### Recommended File Organization
```
src/
├── stores/
│   ├── useAuthStore.ts
│   ├── useChatStore.ts
│   ├── useUIStore.ts
│   └── index.ts          // Re-export all stores
├── types/
│   └── store.ts          // Shared types
└── utils/
    └── storage.ts        // Persistence helpers
```

## TypeScript Best Practices

### 1. Separate State and Actions
```typescript
interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (credentials: LoginData) => Promise<void>
  logout: () => void
  clearError: () => void
}

type AuthStore = AuthState & AuthActions
```

### 2. Use Branded Types for IDs
```typescript
type UserId = string & { __brand: 'UserId' }
type MessageId = string & { __brand: 'MessageId' }

interface ChatStore {
  selectedUserId: UserId | null
  messages: Record<MessageId, Message>
}
```

## State Management Patterns

### 1. Normalized State Structure
```typescript
// Instead of nested arrays
interface BadChatStore {
  conversations: {
    id: string
    messages: Message[]
  }[]
}

// Use normalized structure
interface GoodChatStore {
  conversations: Record<string, Conversation>
  messages: Record<string, Message>
  messagesByConversation: Record<string, string[]>
}
```

### 2. Optimistic Updates
```typescript
const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  
  sendMessage: async (messageData) => {
    const tempId = `temp-${Date.now()}`
    const optimisticMessage = {
      id: tempId,
      ...messageData,
      status: 'sending'
    }
    
    // Add optimistic message
    set(state => ({
      messages: [...state.messages, optimisticMessage]
    }))
    
    try {
      const response = await api.sendMessage(messageData)
      // Replace optimistic message with real one
      set(state => ({
        messages: state.messages.map(msg => 
          msg.id === tempId ? response.data : msg
        )
      }))
    } catch (error) {
      // Remove failed message
      set(state => ({
        messages: state.messages.filter(msg => msg.id !== tempId)
      }))
    }
  }
}))
```

## Performance Optimization

### 1. Selective Subscriptions
```typescript
// ❌ Bad - subscribes to entire store
function UserProfile() {
  const store = useAuthStore()
  return <div>{store.user?.name}</div>
}

// ✅ Good - only subscribes to user
function UserProfile() {
  const user = useAuthStore(state => state.user)
  return <div>{user?.name}</div>
}

// ✅ Even better - with shallow comparison
import { shallow } from 'zustand/shallow'

function UserProfile() {
  const { name, email } = useAuthStore(
    state => ({ name: state.user?.name, email: state.user?.email }),
    shallow
  )
  return <div>{name} - {email}</div>
}
```

### 2. Memoized Selectors
```typescript
const selectFilteredMessages = (filter: string) => (state: ChatStore) =>
  state.messages.filter(msg => msg.type === filter)

function MessageList({ filter }: { filter: string }) {
  const messages = useChatStore(selectFilteredMessages(filter))
  return <div>{/* render messages */}</div>
}
```

## Error Handling Strategies

### 1. Centralized Error Store
```typescript
interface ErrorStore {
  errors: Record<string, string>
  addError: (key: string, message: string) => void
  removeError: (key: string) => void
  clearErrors: () => void
}

const useErrorStore = create<ErrorStore>((set) => ({
  errors: {},
  addError: (key, message) => set(state => ({
    errors: { ...state.errors, [key]: message }
  })),
  removeError: (key) => set(state => {
    const { [key]: removed, ...rest } = state.errors
    return { errors: rest }
  }),
  clearErrors: () => set({ errors: {} })
}))
```

### 2. Action Status Tracking
```typescript
interface ActionStatus {
  isLoading: boolean
  error: string | null
  lastUpdated: number | null
}

interface UserStore {
  users: User[]
  fetchStatus: ActionStatus
  updateStatus: ActionStatus
  
  fetchUsers: () => Promise<void>
  updateUser: (id: string, data: Partial<User>) => Promise<void>
}
```

## Testing Patterns

### 1. Store Testing
```typescript
// userStore.test.ts
import { renderHook, act } from '@testing-library/react'
import { useUserStore } from './useUserStore'

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.setState({ users: [], isLoading: false })
  })
  
  it('should fetch users', async () => {
    const { result } = renderHook(() => useUserStore())
    
    await act(async () => {
      await result.current.fetchUsers()
    })
    
    expect(result.current.users).toHaveLength(2)
    expect(result.current.isLoading).toBe(false)
  })
})
```

### 2. Mock Store for Components
```typescript
// test-utils.tsx
export const createMockStore = (initialState = {}) => {
  return create(() => ({
    user: null,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
    ...initialState
  }))
}
```

## Common Pitfalls to Avoid

1. **Don't mutate state directly**
   ```typescript
   // ❌ Bad
   set(state => {
     state.users.push(newUser)
     return state
   })
   
   // ✅ Good
   set(state => ({
     users: [...state.users, newUser]
   }))
   ```

2. **Don't create stores in components**
   ```typescript
   // ❌ Bad
   function Component() {
     const store = create(() => ({ count: 0 }))
     // ...
   }
   
   // ✅ Good - create stores at module level
   const useStore = create(() => ({ count: 0 }))
   ```