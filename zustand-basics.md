# Zustand Basics: Getting Started

## What is Zustand?

Zustand is a lightweight state management library for React that provides a simple API for creating and managing global state without boilerplate.

## Installation

```bash
npm install zustand
```

## Core Concepts

### 1. Store Creation

```typescript
import { create } from 'zustand'

interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}))
```

### 2. Using the Store in Components

```typescript
function Counter() {
  const { count, increment, decrement } = useCounterStore()
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
```

### 3. Selective Subscriptions (Performance Optimization)

```typescript
// Only re-render when count changes
const count = useCounterStore((state) => state.count)

// Only re-render when increment function changes (rarely)
const increment = useCounterStore((state) => state.increment)
```

## Key Benefits

- **Minimal boilerplate**: No providers, reducers, or actions
- **TypeScript friendly**: Full type safety out of the box
- **Small bundle size**: ~2.5kb gzipped
- **No context providers needed**: Works anywhere in your app
- **Flexible**: Can be used outside React components

## Basic Patterns

### Simple State Updates
```typescript
set({ count: 10 }) // Direct assignment
set((state) => ({ count: state.count + 1 })) // Based on previous state
```

### Accessing Current State
```typescript
const useStore = create((set, get) => ({
  count: 0,
  doubleCount: () => {
    const currentCount = get().count
    set({ count: currentCount * 2 })
  }
}))
```