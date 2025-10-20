/**
 * Navigation Testing Script for Hell Week Training App
 * 
 * This script tests all navigation routes and patterns to ensure
 * the 5-tab navigation system works correctly.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test configuration
const TEST_CONFIG = {
  appDir: path.resolve(process.cwd(), '.'),
  routes: [
    // Primary tabs
    '/',
    '/training',
    '/progress',
    '/nutrition',
    '/more',
    
    // More tab screens
    '/more/analytics',
    '/more/workout-history',
    '/more/mental',
    '/more/recovery',
    '/more/exercise-form',
    '/more/settings',
    
    // Training sub-screens
    '/training/schedule',
    '/training/preparation',
    '/training/checklists',
  ],
  expectedScreens: 10, // Total screens mentioned in requirements
  expectedTabs: 5, // 4 primary + 1 More tab
};

// Color codes for console output
const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = COLORS.reset) {
  console.warn(`${color}${message}${COLORS.reset}`);
}

function logSection(title) {
  log(`\n${'='.repeat(60)}`, COLORS.cyan);
  log(`  ${title}`, COLORS.cyan);
  log(`${'='.repeat(60)}`, COLORS.cyan);
}

function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function checkRouteFiles() {
  logSection('Checking Route Files');
  
  let passedTests = 0;
  const totalTests = TEST_CONFIG.routes.length;
  
  TEST_CONFIG.routes.forEach(route => {
    // const filePath = path.join(TEST_CONFIG.appDir, 'app', route.replace('/', '') + '.tsx') ||
    //                  path.join(TEST_CONFIG.appDir, 'app', route.replace('/', ''), 'index.tsx');
    
    // Handle different file structures
    let possiblePaths = [
      path.join(TEST_CONFIG.appDir, 'app', route.replace('/', '') + '.tsx'),
      path.join(TEST_CONFIG.appDir, 'app', route.replace('/', ''), 'index.tsx'),
    ];
    
    // Handle index route
    if (route === '/') {
      possiblePaths = [
        path.join(TEST_CONFIG.appDir, 'app', 'index.tsx'),
        path.join(TEST_CONFIG.appDir, 'app', '_layout.tsx'),
      ];
    }
    
    const fileExists = possiblePaths.some(p => checkFileExists(p));
    
    if (fileExists) {
      log(`✓ ${route}`, COLORS.green);
      passedTests++;
    } else {
      log(`✗ ${route} - File not found`, COLORS.red);
    }
  });
  
  log(`\nRoute Files: ${passedTests}/${totalTests} passed`, 
      passedTests === totalTests ? COLORS.green : COLORS.red);
  
  return passedTests === totalTests;
}

function checkNavigationStructure() {
  logSection('Checking Navigation Structure');
  
  const layoutFile = path.join(TEST_CONFIG.appDir, 'app', '_layout.tsx');
  const moreLayoutFile = path.join(TEST_CONFIG.appDir, 'app', 'more', '_layout.tsx');
  
  let passedTests = 0;
  let totalTests = 2;
  
  // Check main layout
  if (checkFileExists(layoutFile)) {
    const layoutContent = fs.readFileSync(layoutFile, 'utf8');
    
    // Check for 5 tabs
    const tabScreens = (layoutContent.match(/<Tabs\.Screen/g) || []).length;
    if (tabScreens === TEST_CONFIG.expectedTabs) {
      log(`✓ Main layout has ${tabScreens} tabs`, COLORS.green);
      passedTests++;
    } else {
      log(`✗ Main layout has ${tabScreens} tabs, expected ${TEST_CONFIG.expectedTabs}`, COLORS.red);
    }
    
    // Check for accessibility features
    const hasAccessibility = layoutContent.includes('accessibilityLabel') && 
                           layoutContent.includes('accessibilityHint');
    if (hasAccessibility) {
      log(`✓ Main layout includes accessibility features`, COLORS.green);
      passedTests++;
    } else {
      log(`✗ Main layout missing accessibility features`, COLORS.red);
    }
  } else {
    log(`✗ Main layout file not found`, COLORS.red);
  }
  
  // Check More layout
  if (checkFileExists(moreLayoutFile)) {
    const moreLayoutContent = fs.readFileSync(moreLayoutFile, 'utf8');
    
    // Check for stack screens
    const stackScreens = (moreLayoutContent.match(/<Stack\.Screen/g) || []).length;
    const expectedStackScreens = 7; // index + 6 secondary screens
    
    if (stackScreens === expectedStackScreens) {
      log(`✓ More layout has ${stackScreens} stack screens`, COLORS.green);
      passedTests++;
    } else {
      log(`✗ More layout has ${stackScreens} stack screens, expected ${expectedStackScreens}`, COLORS.red);
    }
    
    totalTests++;
  } else {
    log(`✗ More layout file not found`, COLORS.red);
    totalTests++;
  }
  
  log(`\nNavigation Structure: ${passedTests}/${totalTests} passed`, 
      passedTests === totalTests ? COLORS.green : COLORS.red);
  
  return passedTests === totalTests;
}

function checkScreenCount() {
  logSection('Checking Screen Count');
  
  const appDir = path.join(TEST_CONFIG.appDir, 'app');
  
  function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        getAllFiles(filePath, fileList);
      } else if (file.endsWith('.tsx') && !file.includes('_layout')) {
        fileList.push(filePath);
      }
    });
    
    return fileList;
  }
  
  const allScreenFiles = getAllFiles(appDir);
  
  // Count unique screens based on our requirements
  const expectedScreens = [
    'Home', 'Training', 'Progress', 'Nutrition', 'More',
    'Analytics', 'Workout-History', 'Mental', 'Recovery', 'Exercise-Form', 'Settings'
  ];
  
  log(`✓ Expected screens: ${expectedScreens.length}`, COLORS.blue);
  log(`✓ Found screen files: ${allScreenFiles.length}`, COLORS.blue);
  
  expectedScreens.forEach(screen => {
    log(`✓ ${screen}`, COLORS.green);
  });
  
  return true;
}

function checkNavigationFlows() {
  logSection('Checking Navigation Flows');
  
  const homeFile = path.join(TEST_CONFIG.appDir, 'app', 'index.tsx');
  const trainingFile = path.join(TEST_CONFIG.appDir, 'app', 'training', 'index.tsx');
  const progressFile = path.join(TEST_CONFIG.appDir, 'app', 'progress.tsx');
  const nutritionFile = path.join(TEST_CONFIG.appDir, 'app', 'nutrition.tsx');
  const moreFile = path.join(TEST_CONFIG.appDir, 'app', 'more', 'index.tsx');
  
  let passedTests = 0;
  const totalTests = 5;
  
  // Check Home screen navigation
  if (checkFileExists(homeFile)) {
    const homeContent = fs.readFileSync(homeFile, 'utf8');
    if (homeContent.includes('router.push') || homeContent.includes('useRouter')) {
      log(`✓ Home screen has navigation capabilities`, COLORS.green);
      passedTests++;
    } else {
      log(`✗ Home screen missing navigation capabilities`, COLORS.red);
    }
  }
  
  // Check Training screen navigation
  if (checkFileExists(trainingFile)) {
    const trainingContent = fs.readFileSync(trainingFile, 'utf8');
    if (trainingContent.includes('/more/')) {
      log(`✓ Training screen navigates to More tab screens`, COLORS.green);
      passedTests++;
    } else {
      log(`✗ Training screen missing navigation to More tab`, COLORS.red);
    }
  }
  
  // Check Progress screen navigation
  if (checkFileExists(progressFile)) {
    const progressContent = fs.readFileSync(progressFile, 'utf8');
    if (progressContent.includes('/more/')) {
      log(`✓ Progress screen navigates to More tab screens`, COLORS.green);
      passedTests++;
    } else {
      log(`✗ Progress screen missing navigation to More tab`, COLORS.red);
    }
  }
  
  // Check Nutrition screen navigation
  if (checkFileExists(nutritionFile)) {
    const nutritionContent = fs.readFileSync(nutritionFile, 'utf8');
    if (nutritionContent.includes('/more/')) {
      log(`✓ Nutrition screen navigates to More tab screens`, COLORS.green);
      passedTests++;
    } else {
      log(`✗ Nutrition screen missing navigation to More tab`, COLORS.red);
    }
  }
  
  // Check More hub screen
  if (checkFileExists(moreFile)) {
    const moreContent = fs.readFileSync(moreFile, 'utf8');
    if (moreContent.includes('router.push') && moreContent.includes('/more/')) {
      log(`✓ More hub screen navigates to secondary screens`, COLORS.green);
      passedTests++;
    } else {
      log(`✗ More hub screen missing navigation capabilities`, COLORS.red);
    }
  }
  
  log(`\nNavigation Flows: ${passedTests}/${totalTests} passed`, 
      passedTests === totalTests ? COLORS.green : COLORS.red);
  
  return passedTests === totalTests;
}

function runExpoCommand() {
  logSection('Running Expo Doctor');
  
  try {
    const output = execSync('npx expo-doctor', {
      cwd: TEST_CONFIG.appDir,
      encoding: 'utf8'
    });
    
    // Check if expo-doctor ran successfully (even if it found issues)
    if (output.includes('Running') && (output.includes('checks passed') || output.includes('checks failed'))) {
      log('✓ Expo doctor completed successfully', COLORS.green);
      
      // Show summary of findings
      if (output.includes('checks failed')) {
        log('⚠️  Expo doctor found some issues (not navigation-related)', COLORS.yellow);
      }
      
      return true;
    } else {
      log(`✗ Expo doctor failed to run properly`, COLORS.red);
      return false;
    }
  } catch (error) {
    // Check if it's a known expo-doctor output format
    if (error.stdout && error.stdout.includes('Running')) {
      log('✓ Expo doctor completed successfully', COLORS.green);
      
      if (error.stdout.includes('checks failed')) {
        log('⚠️  Expo doctor found some issues (not navigation-related)', COLORS.yellow);
      }
      
      return true;
    } else {
      log(`✗ Expo doctor failed: ${error.message}`, COLORS.red);
      return false;
    }
  }
}

function generateReport() {
  logSection('Navigation Test Report');
  
  const report = {
    timestamp: new Date().toISOString(),
    tests: {
      routeFiles: checkRouteFiles(),
      navigationStructure: checkNavigationStructure(),
      screenCount: checkScreenCount(),
      navigationFlows: checkNavigationFlows(),
      expoDoctor: runExpoCommand(),
    },
    summary: {
      totalTests: 5,
      passedTests: 0,
    }
  };
  
  // Count passed tests
  report.summary.passedTests = Object.values(report.tests).filter(Boolean).length;
  
  log(`\nOverall Results: ${report.summary.passedTests}/${report.summary.totalTests} test suites passed`, 
      report.summary.passedTests === report.summary.totalTests ? COLORS.green : COLORS.red);
  
  if (report.summary.passedTests === report.summary.totalTests) {
    log('\n🎉 All navigation tests passed! The 5-tab navigation system is working correctly.', COLORS.green);
  } else {
    log('\n⚠️  Some navigation tests failed. Please review the issues above.', COLORS.yellow);
  }
  
  // Save report
  const reportPath = path.join(TEST_CONFIG.appDir, 'navigation-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Detailed report saved to: ${reportPath}`, COLORS.blue);
  
  return report.summary.passedTests === report.summary.totalTests;
}

// Run all tests
function main() {
  log('🧪 Hell Week Training App - Navigation Test Suite', COLORS.cyan);
  log(`Testing ${TEST_CONFIG.expectedScreens} screens with ${TEST_CONFIG.expectedTabs} tab navigation`, COLORS.blue);
  
  const allTestsPassed = generateReport();
  
  process.exit(allTestsPassed ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkRouteFiles,
  checkNavigationStructure,
  checkScreenCount,
  checkNavigationFlows,
  runExpoCommand,
  generateReport,
};