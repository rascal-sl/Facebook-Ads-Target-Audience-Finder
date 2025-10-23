# 🎯 Facebook Ads Target Audience Finder

<div align="center">

![Facebook Ads Target Audience Finder](https://img.shields.io/badge/Facebook%20Ads-Target%20Audience%20Finder-blue?style=for-the-badge&logo=facebook)

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.14-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A powerful, modern web application for discovering and analyzing Facebook advertising target audiences with precision and ease.**

[🚀 Live Demo](https://rascal-sl.github.io/Facebook-Ads-Target-Audience-Finder) • [📖 Documentation](#documentation) • [🤝 Contributing](#contributing) • [🐛 Report Bug](https://github.com/rascal-sl/Facebook-Ads-Target-Audience-Finder/issues)

</div>

---

## ✨ Features

### 🎯 **Advanced Audience Discovery**
- **Smart Location Search**: Find audiences by city, region, or country with intelligent autocomplete
- **Demographic Filtering**: Target by age groups, gender, income levels, and interests
- **Competition Analysis**: Analyze competition levels and CPM rates for optimal targeting
- **Radius-Based Targeting**: Set custom search radius for precise geographical targeting

### 📊 **Comprehensive Analytics**
- **Real-time Metrics**: View reach, engagement, and conversion data instantly
- **Interactive Charts**: Beautiful visualizations powered by Recharts
- **Demographic Breakdown**: Detailed audience composition analysis
- **Performance Tracking**: Monitor campaign performance across different segments

### 🔍 **Search & History Management**
- **Search History**: Save and revisit previous audience searches
- **Export Functionality**: Download search results and analytics data
- **Comparison Tools**: Compare multiple audience segments side-by-side
- **Filtering & Sorting**: Organize searches by date, performance, or custom criteria

### 🎨 **Modern User Experience**
- **Dark/Light Mode**: Seamless theme switching for comfortable usage
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with keyboard navigation support

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rascal-sl/Facebook-Ads-Target-Audience-Finder.git
   cd Facebook-Ads-Target-Audience-Finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment.

---

## 📖 Documentation

### Project Structure

```
facebook-ads-target-audience-finder/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   └── ui/           # Base UI components (Button, Card, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and helpers
│   ├── pages/            # Application pages/routes
│   ├── stores/           # Zustand state management
│   └── assets/           # Images, icons, and other assets
├── .github/              # GitHub workflows and templates
└── docs/                 # Additional documentation
```

### Key Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Zustand for lightweight state management
- **Charts**: Recharts for beautiful data visualizations
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router for client-side navigation

### API Integration

The application uses mock data for demonstration purposes. To integrate with real Facebook Marketing API:

1. **Set up Facebook App**
   - Create a Facebook Developer account
   - Set up a new app with Marketing API access
   - Obtain your App ID and App Secret

2. **Configure Environment Variables**
   ```bash
   # Create .env.local file
   VITE_FACEBOOK_APP_ID=your_app_id
   VITE_FACEBOOK_APP_SECRET=your_app_secret
   VITE_API_BASE_URL=https://graph.facebook.com/v18.0
   ```

3. **Update API Calls**
   Replace mock data calls in `src/stores/searchStore.ts` with actual Facebook Marketing API calls.

---

## 🎨 Usage Guide

### 1. **Audience Search**
- Enter keywords or location names in the search bar
- Apply filters for demographics, interests, and competition level
- Click "Find Audiences" to discover potential targets

### 2. **Analyzing Results**
- View detailed audience metrics including reach and CPM
- Explore demographic breakdowns with interactive charts
- Compare different audience segments

### 3. **Managing Searches**
- Save successful searches for future reference
- Access search history from the History page
- Export data for external analysis

### 4. **Dashboard Analytics**
- Monitor overall campaign performance
- Track key metrics across all searches
- Identify top-performing audience segments

---

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

### Environment Setup

1. **Install recommended VS Code extensions**:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Importer

2. **Configure your editor** to format on save and show linting errors

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests if applicable
4. **Commit your changes**: `git commit -m 'feat: add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages using [Conventional Commits](https://conventionalcommits.org/)
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

<div align="center">

**Developed with ❤️ by [Tisankan](https://tisankan.dev)**

[![Portfolio](https://img.shields.io/badge/Portfolio-tisankan.dev-blue?style=flat&logo=google-chrome)](https://tisankan.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://linkedin.com/in/tisankan)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/tisankan)

---

## 🤝 Welcome Contributors!

We warmly welcome contributions from developers around the world! Whether you're fixing bugs, adding features, improving documentation, or suggesting enhancements, your contributions make this project better for everyone.

### 🚀 How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 🎯 What We're Looking For

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage improvements
- 🌐 Internationalization support

### 💡 Get Started

Check out our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) to get started. Don't hesitate to reach out if you have questions!

**Join our community of contributors and help make Facebook advertising more accessible to everyone! 🌟**

**Chief Technology Officer at Yarl Ventures (PVT) Ltd**

*Full-stack development, reliable cloud, and data-driven marketing—built to ship fast, scale safely, and grow.*

</div>

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Recharts** for beautiful chart components
- **Zustand** for simple state management
- **Vite** for the lightning-fast build tool
- **Facebook Marketing API** for audience insights

---

## 📞 Support

If you have any questions or need help with the project:

- 📧 **Email**: [hello@tisankan.dev](mailto:hello@tisankan.dev)
- 🐛 **Issues**: [GitHub Issues](https://github.com/rascal-sl/Facebook-Ads-Target-Audience-Finder/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/rascal-sl/Facebook-Ads-Target-Audience-Finder/discussions)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ and ☕ by [Tisankan](https://tisankan.dev)

</div>
