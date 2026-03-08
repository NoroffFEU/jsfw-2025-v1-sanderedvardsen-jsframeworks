# AI Usage Log

## Tool Used

Claude AI

---

### Entry 1

**Date:** 2 March 2026
**Purpose:** Brainstorming project structure and component breakdown for the online shop
**Outcome:** Got a better understanding of how to organize a Next.js App Router project with separate folders for components, context, lib, and types. Helped me plan out which pages I needed (home, product detail, cart, checkout success, contact).

---

### Entry 2

**Date:** 3 March 2026
**Purpose:** Understanding how server components vs client components work in Next.js App Router
**Outcome:** Learned that components are server components by default and you need to add `"use client"` at the top when using hooks like `useState` or `useEffect`. Used this to decide which components needed to be client-side (cart, search, forms) and which could stay on the server (product listing, product detail page).

---

### Entry 3

**Date:** 4 March 2026
**Purpose:** Help setting up React Context for the shopping cart with localStorage persistence
**Outcome:** Understood how to create a context provider that wraps the app and how `useEffect` can sync state to localStorage so the cart survives page refreshes. Wrote the cart logic based on this understanding.

---

### Entry 4

**Date:** 6 March 2026
**Purpose:** Debugging Tailwind CSS v4 styling issues — custom theme colors weren't applying
**Outcome:** Learned that Tailwind v4 uses CSS cascade layers internally, and that certain color names like `--color-border`, `--color-bg`, and `--color-text` conflict with built-in Tailwind utilities. Renamed my custom colors to avoid conflicts. Also learned that a CSS wildcard reset (`* { margin: 0; padding: 0 }`) outside of `@layer base` overrides Tailwind utilities due to how CSS layers work.

---

### Entry 5

**Date:** 7 March 2026
**Purpose:** Setting up form validation with React Hook Form and Zod
**Outcome:** Learned how to define a Zod schema and connect it to React Hook Form using `zodResolver`. Understood how `register` binds inputs and how `formState.errors` provides validation messages. Used `z.infer` to get the TypeScript type from the schema instead of writing a separate interface.

---

### Entry 6

**Date:** 7 March 2026
**Purpose:** Understanding how to fetch data from the Noroff API in server components
**Outcome:** Learned that in App Router you can make async server components that fetch data directly without `useEffect`. Created helper functions in a separate `lib/api.ts` file to keep things clean.
