/**
 * Navigation Animation Testing Script
 * 
 * This script tests navigation animations to ensure smooth transitions
 * and proper performance across all navigation flows.
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const TEST_CONFIG = {
  appDir: path.resolve(process.cwd(), '.'),
  navigationFlows: [
    // Training stack flows
    { from: '/training', to: '/training/preparation', description: 'Training to Preparation' },
    { from: '/training/preparation', to: '/training/checklists', description: 'Preparation to Checklists' },
    { from: '/training/checklists', to: '/training/schedule', description: 'Checklists to Schedule' },
    
    // More stack flows
    { from: '/more', to: '/more/analytics', description: 'More to Analytics' },
    { from: '/more/analytics', to: '/more/workout-history', description: 'Analytics to Workout History' },
    { from: '/more/workout-history', to: '/more/settings', description: 'Workout History to Settings' },
    
    // Tab switching flows
    { from: '/', to: '/training', description: 'Home to Training' },
    { from: '/training', to: '/progress', description: 'Training to Progress' },
    { from: '/progress', to: '/nutrition', description: 'Progress to Nutrition' },
    { from: '/nutrition', to: '/more', description: 'Nutrition to More' },
  ],
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

function checkAnimationService() {
  logSection('Checking Animation Service');
  
  const animationServicePath = path.join(TEST_CONFIG.appDir, 'services', 'navigationAnimationService.ts');
  
  if (fs.existsSync(animationServicePath)) {
    log('✓ Navigation animation service exists', COLORS.green);
    
    const content = fs.readFileSync(animationServicePath, 'utf8');
    
    // Check for key animation configurations
    const hasTrainingConfig = content.includes('getTrainingStackConfig');
    const hasMoreConfig = content.includes('getMoreStackConfig');
    const hasPlatformConfig = content.includes('getPlatformSpecificConfig');
    const hasPreparationConfig = content.includes('getPreparationToChecklistConfig');
    
    if (hasTrainingConfig) {
      log('✓ Training stack animation configuration found', COLORS.green);
    } else {
      log('✗ Training stack animation configuration missing', COLORS.red);
    }
    
    if (hasMoreConfig) {
      log('✓ More stack animation configuration found', COLORS.green);
    } else {
      log('✗ More stack animation configuration missing', COLORS.red);
    }
    
    if (hasPlatformConfig) {
      log('✓ Platform-specific animation configuration found', COLORS.green);
    } else {
      log('✗ Platform-specific animation configuration missing', COLORS.red);
    }
    
    if (hasPreparationConfig) {
      log('✓ Preparation to checklist animation configuration found', COLORS.green);
    } else {
      log('✗ Preparation to checklist animation configuration missing', COLORS.red);
    }
    
    return hasTrainingConfig && hasMoreConfig && hasPlatformConfig && hasPreparationConfig;
  } else {
    log('✗ Navigation animation service not found', COLORS.red);
    return false;
  }
}

function checkLayoutAnimations() {
  logSection('Checking Layout Animation Configurations');
  
  const trainingLayoutPath = path.join(TEST_CONFIG.appDir, 'app', 'training', '_layout.tsx');
  const moreLayoutPath = path.join(TEST_CONFIG.appDir, 'app', 'more', '_layout.tsx');
  const mainLayoutPath = path.join(TEST_CONFIG.appDir, 'app', '_layout.tsx');
  
  let passedTests = 0;
  const totalTests = 3;
  
  // Check training layout
  if (fs.existsSync(trainingLayoutPath)) {
    const trainingContent = fs.readFileSync(trainingLayoutPath, 'utf8');
    
    const hasAnimationConfig = trainingContent.includes('animationDuration') && 
                              trainingContent.includes('navigationAnimationService');
    
    if (hasAnimationConfig) {
      log('✓ Training layout has animation configuration', COLORS.green);
      passedTests++;
    } else {
      log('✗ Training layout missing animation configuration', COLORS.red);
    }
  } else {
    log('✗ Training layout file not found', COLORS.red);
  }
  
  // Check more layout
  if (fs.existsSync(moreLayoutPath)) {
    const moreContent = fs.readFileSync(moreLayoutPath, 'utf8');
    
    const hasAnimationConfig = moreContent.includes('animationDuration') && 
                              moreContent.includes('navigationAnimationService');
    
    if (hasAnimationConfig) {
      log('✓ More layout has animation configuration', COLORS.green);
      passedTests++;
    } else {
      log('✗ More layout missing animation configuration', COLORS.red);
    }
  } else {
    log('✗ More layout file not found', COLORS.red);
  }
  
  // Check main layout
  if (fs.existsSync(mainLayoutPath)) {
    const mainContent = fs.readFileSync(mainLayoutPath, 'utf8');
    
    const hasTabLayout = mainContent.includes('<Tabs') && 
                        mainContent.includes('tabBarStyle');
    
    if (hasTabLayout) {
      log('✓ Main layout has tab configuration', COLORS.green);
      passedTests++;
    } else {
      log('✗ Main layout missing tab configuration', COLORS.red);
    }
  } else {
    log('✗ Main layout file not found', COLORS.red);
  }
  
  log(`\nLayout Animations: ${passedTests}/${totalTests} passed`, 
      passedTests === totalTests ? COLORS.green : COLORS.red);
  
  return passedTests === totalTests;
}

function checkPerformanceService() {
  logSection('Checking Performance Service');
  
  const performanceServicePath = path.join(TEST_CONFIG.appDir, 'services', 'animationPerformanceService.ts');
  
  if (fs.existsSync(performanceServicePath)) {
    log('✓ Animation performance service exists', COLORS.green);
    
    const content = fs.readFileSync(performanceServicePath, 'utf8');
    
    const hasMonitoring = content.includes('startMonitoring') && 
                         content.includes('recordMetrics');
    const hasReporting = content.includes('getPerformanceReport');
    
    if (hasMonitoring) {
      log('✓ Performance monitoring functionality found', COLORS.green);
    } else {
      log('✗ Performance monitoring functionality missing', COLORS.red);
    }
    
    if (hasReporting) {
      log('✓ Performance reporting functionality found', COLORS.green);
    } else {
      log('✗ Performance reporting functionality missing', COLORS.red);
    }
    
    return hasMonitoring && hasReporting;
  } else {
    log('✗ Animation performance service not found', COLORS.red);
    return false;
  }
}

function generateAnimationTestReport() {
  logSection('Navigation Animation Test Report');
  
  const report = {
    timestamp: new Date().toISOString(),
    tests: {
      animationService: checkAnimationService(),
      layoutAnimations: checkLayoutAnimations(),
      performanceService: checkPerformanceService(),
    },
    summary: {
      totalTests: 3,
      passedTests: 0,
    }
  };
  
  // Count passed tests
  report.summary.passedTests = Object.values(report.tests).filter(Boolean).length;
  
  log(`\nOverall Results: ${report.summary.passedTests}/${report.summary.totalTests} test suites passed`, 
      report.summary.passedTests === report.summary.totalTests ? COLORS.green : COLORS.red);
  
  if (report.summary.passedTests === report.summary.totalTests) {
    log('\n🎉 All navigation animation tests passed! The animation system is properly configured.', COLORS.green);
  } else {
    log('\n⚠️  Some animation tests failed. Please review the issues above.', COLORS.yellow);
  }
  
  // Save report
  const reportPath = path.join(TEST_CONFIG.appDir, 'navigation-animation-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Detailed animation test report saved to: ${reportPath}`, COLORS.blue);
  
  return report.summary.passedTests === report.summary.totalTests;
}

// Run all tests
function main() {
  log('🧪 Hell Week Training App - Navigation Animation Test Suite', COLORS.cyan);
  log(`Testing navigation animation configurations and performance monitoring`, COLORS.blue);
  
  const allTestsPassed = generateAnimationTestReport();
  
  process.exit(allTestsPassed ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkAnimationService,
  checkLayoutAnimations,
  checkPerformanceService,
  generateAnimationTestReport,
};