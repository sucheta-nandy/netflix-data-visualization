# 🎬 Netflix Data Visualization Portfolio

An interactive data visualization portfolio showcasing Netflix streaming analytics, content trends, and global viewership insights. Built for Netflix job application to demonstrate expertise in data storytelling, front-end development, and visualization design. https://vizual100.netlify.app

![Netflix Data Viz](https://img.shields.io/badge/Netflix-Data%20Visualization-E50914?style=for-the-badge&logo=netflix)
![D3.js](https://img.shields.io/badge/D3.js-v7-F9A03C?style=for-the-badge&logo=d3.js)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

## 🌟 Features

### Interactive Visualizations

1. **Streaming Evolution Timeline**
   - Time-series visualization of content releases and viewership (2020-2024)
   - Interactive metric switching (releases, viewership, watch hours)
   - Smooth animated transitions and hover tooltips

2. **Content Universe (Genre Distribution)**
   - Donut chart showing genre breakdown across 15,000+ titles
   - Interactive segments with detailed statistics
   - Dynamic color-coded legend

3. **Global Reach Map**
   - Bubble map visualization of worldwide viewership
   - Size represents subscriber count, color represents engagement
   - 20+ countries with detailed metrics

4. **Top Performers Dashboard**
   - Horizontal bar chart of most-watched content
   - Scatter plot analyzing rating vs. viewership correlation
   - Multi-metric comparison capabilities

5. **Viewer Engagement Analytics**
   - Dual-axis chart combining watch hours and completion rates
   - Weekly engagement patterns
   - Animated metric cards with key statistics

### Design Highlights

- **Netflix-Inspired Aesthetic**: Premium dark theme with signature red (#E50914) accents
- **Glassmorphism Effects**: Frosted glass cards with backdrop blur
- **Smooth Animations**: 60fps transitions and micro-interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Accessibility**: High contrast ratios and semantic HTML

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in a modern web browser (Chrome, Firefox, Safari, or Edge).

```bash
cd netflix-data-visualization
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

### Option 2: Local Server (Recommended)
For best performance, serve via a local HTTP server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server -p 8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📁 Project Structure

```
netflix-data-viz/
├── index.html                      # Main HTML file
├── styles.css                      # Complete design system
├── src/
│   ├── app.js                     # Application initialization
│   ├── data/
│   │   └── streamingData.js       # Mock Netflix datasets
│   ├── utils/
│   │   └── animations.js          # Animation utilities
│   └── visualizations/
│       ├── timeline.js            # Streaming timeline chart
│       ├── genres.js              # Genre distribution donut
│       ├── globalMap.js           # Global viewership map
│       ├── dashboard.js           # Top content charts
│       └── engagement.js          # Engagement metrics
└── README.md                       # This file
```

## 🎨 Technology Stack

- **Visualization**: D3.js v7 (data-driven documents)
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with custom properties and animations
- **Fonts**: Google Fonts (Inter, Bebas Neue)
- **Data**: Simulated Netflix streaming analytics

## 📊 Data Insights

The visualizations showcase:
- **247M** global subscribers
- **15,000+** titles across 10+ genres
- **190** countries served
- **73%** average completion rate
- **2.4** hours average daily watch time

## 🎯 Key Skills Demonstrated

### Data Storytelling
- Clear narrative flow from global trends to specific metrics
- Contextual information hierarchy
- Compelling visual design that guides the viewer

### Front-End Development
- Modern JavaScript (ES6+) with modular architecture
- D3.js for complex data visualizations
- Responsive CSS with advanced animations
- Performance optimization (60fps animations)

### Visualization Design
- Multiple chart types (line, donut, bar, scatter, bubble map)
- Interactive tooltips and hover states
- Color theory and accessibility
- Smooth transitions and micro-interactions

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📝 Notes

- All data is simulated for demonstration purposes
- Visualizations are fully responsive and interactive
- Optimized for modern browsers with ES6 support
- No external dependencies required (D3.js loaded via CDN)

## 👨‍💻 About

Created as by Sucheta Nandy along with Gemini showcasing:
- Advanced data visualization skills
- Front-end development expertise (JavaScript, D3.js)
- Design sensibility and attention to detail
- Ability to tell compelling stories with data

---

**Built with ❤️ **
