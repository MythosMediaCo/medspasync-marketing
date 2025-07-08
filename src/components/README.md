# Vibrant Design System

A modern, colorful design system built with React and CSS that features vibrant gradients, smooth animations, and glass morphism effects.

## Features

- 🎨 **Vibrant Color Palette** - Bold gradients and colorful combinations
- ✨ **Smooth Animations** - Hover effects and transitions
- 📱 **Responsive Design** - Works on all device sizes
- 🪟 **Glass Morphism** - Modern backdrop blur effects
- 🎯 **Interactive Elements** - Engaging buttons and form components
- 📊 **Status Indicators** - Colorful status badges

## Components

### Navigation
```jsx
<nav className="navbar">
  <div className="navbar-brand">Vibrant System</div>
  <ul className="navbar-nav">
    <li><a href="#home">Home</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

### Hero Section
```jsx
<section className="hero">
  <div className="container">
    <h1>Vibrant Design</h1>
    <p>A colorful and energetic design system...</p>
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <button className="btn btn-primary">Get Started</button>
      <button className="btn btn-secondary">Learn More</button>
    </div>
  </div>
</section>
```

### Cards
```jsx
<div className="card-grid">
  <div className="card">
    <h3>Card Title</h3>
    <p>Card description...</p>
    <button className="btn btn-accent">Action</button>
  </div>
</div>
```

### Buttons
```jsx
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
<button className="btn btn-accent">Accent Button</button>
```

### Form Elements
```jsx
<div className="form-group">
  <label className="form-label">Email Address</label>
  <input type="email" className="form-input" placeholder="Enter your email" />
</div>
```

### Status Indicators
```jsx
<span className="status status-success">Success</span>
<span className="status status-error">Error</span>
<span className="status status-warning">Warning</span>
<span className="status status-info">Info</span>
```

### Modal
```jsx
const [isModalOpen, setIsModalOpen] = useState(false);

{isModalOpen && (
  <div className="modal show" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title">Modal Title</h3>
        <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
      </div>
      <p>Modal content...</p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Confirm</button>
        <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
```

## Color Palette

- **Primary**: `#FF6B6B` to `#FF8E53`
- **Secondary**: `#4ECDC4` to `#44A08D`
- **Accent**: `#A8E6CF` to `#88D8C0`
- **Success**: `#A8E6CF` to `#88D8C0`
- **Error**: `#FFB3BA` to `#FF8A95`
- **Warning**: `#FFD93D` to `#FFB347`
- **Info**: `#B8E6B8` to `#A8E6CF`

## Typography

- **Font Family**: Inter
- **Headings**: 800 weight with gradient text
- **Body**: 400-500 weight
- **Buttons**: 700 weight

## Usage

1. Import the CSS file:
```jsx
import './VibrantDesignSystem.css';
```

2. Use the components in your React application:
```jsx
import VibrantDesignSystem from './components/VibrantDesignSystem';

function App() {
  return (
    <div>
      <VibrantDesignSystem />
    </div>
  );
}
```

## Examples

- `VibrantDesignSystem.jsx` - Complete design system showcase
- `VibrantDesignDemo.jsx` - Interactive demo with tabs and variations
- `VibrantExample.jsx` - Real-world application example

## Responsive Design

The design system is fully responsive with breakpoints at:
- **768px**: Tablet adjustments
- **480px**: Mobile adjustments

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Backdrop filter support for glass morphism effects
- CSS custom properties for dynamic theming

## Customization

You can customize the design system by:
- Modifying CSS custom properties
- Adjusting color values in the CSS file
- Adding new component variations
- Extending the existing component classes

## License

This design system is part of the MedSpaSync project and follows the project's licensing terms. 