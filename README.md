# DubsWay Video AI - Student Learning App

A React Native application that helps students convert video lectures and audio recordings into searchable PDF documents using AI technology.

## Features

### 🎯 Core Features
- **Video to PDF Conversion**: Transform video lectures into organized PDF documents
- **Audio to PDF Conversion**: Convert audio recordings into searchable text documents
- **AI-Powered Transcription**: High-accuracy speech-to-text conversion
- **Searchable Content**: Find any information instantly in your documents
- **User Authentication**: Secure login and registration system
- **Modern UI/UX**: Clean, student-friendly interface

### 🎨 Design Features
- **Modern Color Palette**: Student-friendly indigo and purple theme
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Enhanced user experience with subtle animations
- **Accessibility**: Built with accessibility best practices
- **Dark Mode Ready**: Prepared for future dark mode implementation

## Project Structure

```
dubsway-video-ai/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components (Button, Input, etc.)
│   │   └── LoadingScreen.js # App loading screen
│   ├── screens/            # Screen components
│   │   ├── auth/          # Authentication screens
│   │   │   ├── LoginScreen.jsx
│   │   │   └── SignUpScreen.jsx
│   │   └── main/          # Main app screens
│   │       ├── HomeScreen.jsx  # Welcome/onboarding screen
│   │       └── Home.jsx        # Main dashboard
│   ├── navigation/         # Navigation configuration
│   │   ├── AppNavigator.js    # Main app navigator
│   │   ├── AuthStack.jsx      # Authentication stack
│   │   └── DrawerNavigation.jsx # Drawer navigation
│   ├── context/           # React Context providers
│   │   └── AuthContext.js # Authentication context
│   ├── hooks/             # Custom hooks
│   │   └── useAuth.js     # Authentication hook
│   ├── services/          # API calls and external services
│   │   └── api.js         # API service layer
│   ├── utils/             # Utility functions and constants
│   │   ├── colors.js      # Color palette
│   │   ├── designSystem.js # Design system constants
│   │   ├── constants.js   # App constants
│   │   ├── helpers.js     # Helper functions
│   │   └── storage.js     # Storage utilities
│   ├── styles/            # Global styles
│   │   ├── authStyles.js  # Authentication screen styles
│   │   ├── homeStyles.js  # Home screen styles
│   │   └── globalStyles.js # Global styles
│   └── assets/            # Images, icons, fonts
│       ├── images/
│       └── icons/
├── App.js                 # Main app component
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Running the App
- **iOS**: `npm run ios`
- **Android**: `npm run android`
- **Web**: `npm run web`

## Key Dependencies

- **React Navigation**: Navigation library for React Native
- **React Native Vector Icons**: Icon library
- **AsyncStorage**: Local storage for React Native
- **React Native Gesture Handler**: Gesture handling
- **Expo**: Development platform

## Design System

### Color Palette
- **Primary**: Indigo (#6366F1) - Modern, professional
- **Secondary**: Pink (#EC4899) - Accent color
- **Success**: Emerald (#10B981) - Success states
- **Background**: Soft gray-blue (#F8FAFC)
- **Text**: Dark gray (#1F2937)

### Typography
- **Heading**: Bold, large text for titles
- **Subheading**: Semi-bold, medium text for subtitles
- **Body**: Regular text for content
- **Caption**: Small text for descriptions

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

## Key Improvements Made

### 1. **Project Structure**
- Organized files into logical folders
- Created barrel exports for cleaner imports
- Separated concerns with dedicated folders

### 2. **Design System**
- Comprehensive color palette
- Typography system
- Spacing and layout system
- Modular styles for easy maintenance

### 3. **Authentication Flow**
- Improved AuthContext with proper state management
- Better error handling and validation
- Loading states and user feedback
- Removed back buttons from auth screens

### 4. **UI/UX Improvements**
- Modern, student-friendly design
- Consistent spacing and typography
- Smooth animations and transitions
- Better accessibility support
- Responsive design for all screen sizes

### 5. **Code Quality**
- Clean, maintainable code structure
- Proper error handling
- Loading states throughout the app
- Consistent naming conventions
- TypeScript-ready structure

## Future Enhancements

### Planned Features
- File upload functionality
- PDF generation and processing
- User dashboard with analytics
- Document management system
- Search functionality
- Push notifications
- Dark mode support
- Offline mode support

### Technical Improvements
- TypeScript migration
- Unit and integration tests
- Performance optimizations
- State management with Redux (if needed)
- Better error boundary handling
- Accessibility improvements

## API Integration

The app is currently configured to work with the following API endpoints:
- **Login**: `POST /api/auth/login`
- **Signup**: `POST /api/auth/signup`
- **File Upload**: `POST /api/upload` (to be implemented)
- **Document Processing**: `POST /api/process` (to be implemented)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.
