# MedSpaSync Pro Tailwind CSS Guidelines

## Overview

This document outlines the standardized Tailwind CSS configuration and usage patterns for MedSpaSync Pro. Following these guidelines ensures consistency, prevents conflicts, and maintains the design system integrity.

## Configuration Structure

### Color System

Our color system is built around the **MedSpaSync Pro Brand Identity** with multiple layers for flexibility:

#### Primary Brand Colors
```css
brand: {
  primary: '#1a365d',     // Deep navy - trustworthy but not clinical
  secondary: '#faf9f6',   // Warm cream - human, not sterile  
  accent: '#ff6b35',      // Warm coral - energetic, approachable
  accent-light: '#ff8a65' // Lighter coral for hover states
}
```

#### Standard Colors (for compatibility)
```css
primary: { light: '#4ade80', DEFAULT: '#16a34a', dark: '#166534' }
secondary: { light: '#93c5fd', DEFAULT: '#3b82f6', dark: '#1e3a8a' }
```

#### Usage Guidelines

- **Use `brand.*` colors for brand-specific elements** (headers, primary buttons, hero sections)
- **Use standard `primary/secondary` for general UI components** (forms, cards, secondary buttons)
- **Use semantic colors** (`success`, `warning`, `error`, `info`) for status indicators
- **Use `neutral.*` for text and backgrounds** instead of gray scales

#### Color Best Practices

1. **Prefer semantic names over hex values:**
   ```jsx
   // ✅ Good
   <div className="bg-brand-primary text-brand-secondary">
   
   // ❌ Avoid
   <div className="bg-[#1a365d] text-[#faf9f6]">
   ```

2. **Use consistent hover patterns:**
   ```jsx
   // ✅ Good
   <button className="bg-brand-accent hover:bg-brand-accent-light">
   
   // ❌ Avoid
   <button className="bg-brand-accent hover:bg-orange-400">
   ```

### Typography System

Our typography follows a **hierarchical scale** designed for medical spa content:

#### Display & Hero Text
- `hero` - Main landing page headlines (4.5rem)
- `display-large` - Section headers (3.5rem)
- `display-medium` - Subsection headers (2.75rem)

#### Content Text
- `title-large` - Card titles, form section headers (1.875rem)
- `title-medium` - Component titles (1.5rem)
- `body-large` - Important body text, lead paragraphs (1.25rem)
- `body` - Standard body text (1.125rem)
- `body-small` - Secondary text, captions (1rem)

#### Labels & Metadata
- `label` - Form labels, category tags (0.875rem, uppercase, bold)
- `caption` - Image captions, footnotes (0.75rem)

#### Typography Best Practices

1. **Use semantic font sizes:**
   ```jsx
   // ✅ Good
   <h1 className="text-hero font-bold text-brand-primary">
   <p className="text-body text-neutral-700">
   
   // ❌ Avoid
   <h1 className="text-6xl font-bold text-blue-900">
   <p className="text-lg text-gray-600">
   ```

2. **Maintain hierarchy:**
   ```jsx
   // ✅ Good - Clear hierarchy
   <h2 className="text-title-large">Section Title</h2>
   <h3 className="text-title-medium">Subsection</h3>
   <p className="text-body">Content text</p>
   
   // ❌ Avoid - Inconsistent hierarchy  
   <h2 className="text-3xl">Section Title</h2>
   <h3 className="text-2xl">Subsection</h3>
   <p className="text-xl">Content text</p>
   ```

### Spacing System

Based on **8px base unit** for consistent rhythm:

#### Standard Scale
- `xs`: 4px - Minimal spacing
- `sm`: 8px - Base unit
- `md`: 16px - Standard component spacing
- `lg`: 24px - Section spacing
- `xl`: 32px - Large section spacing
- `2xl`: 48px - Major section breaks

#### Semantic Spacing
- `card-padding`: 40px - Standard card internal padding
- `section-padding`: 100px - Major section vertical padding
- `container-padding`: 32px - Container horizontal padding
- `grid-gap`: 32px - Grid system gaps

#### Spacing Best Practices

1. **Use semantic spacing for layout:**
   ```jsx
   // ✅ Good
   <div className="p-card-padding">
   <section className="py-section-padding">
   
   // ❌ Avoid
   <div className="p-10">
   <section className="py-24">
   ```

2. **Maintain consistent rhythm:**
   ```jsx
   // ✅ Good - 8px rhythm
   <div className="space-y-md"> {/* 16px gaps */}
   <div className="space-y-lg"> {/* 24px gaps */}
   
   // ❌ Avoid - Breaking rhythm
   <div className="space-y-6">  {/* 24px */}
   <div className="space-y-5">  {/* 20px */}
   ```

### Component Classes

Pre-built component classes for consistency:

#### Buttons
```jsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
```

#### Cards
```jsx
<div className="card-elevated">Standard elevated card</div>
```

#### Forms
```jsx
<label className="form-label">Field Label</label>
<input className="form-input" />
```

### Shadow & Effects

Enhanced shadows with **brand color tinting**:

- `shadow-sm` through `shadow-xl` - Standard hierarchy with navy tint
- `shadow-card` / `shadow-card-hover` - Specific card shadows
- `shadow-button` / `shadow-button-hover` - Button shadows with coral tint

## Usage Patterns

### Layout Components

1. **Page Structure:**
   ```jsx
   <div className="min-h-screen bg-background-primary">
     <header className="container mx-auto px-container-padding">
     <main className="py-section-padding">
       <section className="container mx-auto px-container-padding">
   ```

2. **Card Grids:**
   ```jsx
   <div className="grid grid-cols-data-cards gap-grid-gap">
     <div className="card-elevated">
   ```

3. **Forms:**
   ```jsx
   <div className="space-y-lg">
     <div>
       <label className="form-label">Label</label>
       <input className="form-input" />
     </div>
   </div>
   ```

### Responsive Design

- Use mobile-first approach
- Leverage grid systems: `grid-cols-data-cards`, `grid-cols-test-categories`
- Use semantic breakpoints with layout spacing

### Dark Mode Support

- Dark mode is enabled with `darkMode: 'class'`
- Use `dark:` prefixes sparingly, prefer semantic color variables
- Test all brand colors in both light and dark modes

## Validation & Quality Control

### Pre-build Validation

The configuration includes automatic validation:

```bash
npm run validate-tailwind
```

This checks for:
- ✅ Proper configuration structure
- ✅ Color format consistency  
- ✅ 8px spacing compliance
- ✅ Typography format validation
- ⚠️  Duplicate color warnings
- ⚠️  Potential namespace conflicts

### Common Issues to Avoid

1. **Color Conflicts:**
   - Don't mix `brand.*` and standard color namespaces in the same component
   - Use consistent hover patterns

2. **Spacing Violations:**
   - Avoid arbitrary values that break the 8px rhythm
   - Use semantic spacing names over numeric values

3. **Typography Inconsistencies:**
   - Don't use arbitrary font sizes
   - Maintain proper hierarchy

4. **Shadow Mixing:**
   - Don't mix standard and custom shadow systems
   - Use component-specific shadows consistently

## Migration Guidelines

When updating components to use this configuration:

1. **Replace old color classes:**
   ```jsx
   // Before
   <div className="bg-blue-900 text-white">
   
   // After  
   <div className="bg-brand-primary text-brand-secondary">
   ```

2. **Update spacing:**
   ```jsx
   // Before
   <div className="p-8 space-y-6">
   
   // After
   <div className="p-card-padding space-y-lg">
   ```

3. **Standardize typography:**
   ```jsx
   // Before
   <h2 className="text-3xl font-bold">
   
   // After
   <h2 className="text-title-large">
   ```

## Team Standards

### Code Review Checklist

- [ ] Uses semantic color names instead of arbitrary values
- [ ] Follows 8px spacing rhythm
- [ ] Uses proper typography hierarchy
- [ ] Leverages component classes where appropriate
- [ ] Passes Tailwind validation

### Documentation Updates

When adding new patterns:
1. Update this guidelines document
2. Add validation rules if necessary
3. Update component examples
4. Test across all breakpoints and themes

---

**Last Updated:** 2025-07-12  
**Version:** 1.0.0  
**Validation Status:** ✅ Passes with warnings