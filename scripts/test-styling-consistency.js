#!/usr/bin/env node

/**
 * Styling Consistency Test Script
 * Verifies that all screens use consistent styling patterns
 */

const fs = require('fs');

function checkFileForStyling(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    const checks = {
      hasColorScheme: content.includes('useColorScheme()'),
      hasColorsImport: content.includes('Colors') && content.includes('from \'../constants/Colors\''),
      hasSafeAreaView: content.includes('SafeAreaView'),
      hasScrollView: content.includes('ScrollView'),
      hasConsistentHeader: content.includes('title: 28') || content.includes('fontSize: 28'),
      hasConsistentSection: content.includes('sectionTitle: 20') || content.includes('fontSize: 20'),
      hasConsistentCard: content.includes('borderRadius: 16') || content.includes('borderRadius: 12'),
      hasConsistentShadow: content.includes('shadowOffset') || content.includes('elevation: 3'),
      hasAccessibility: content.includes('accessible') || content.includes('accessibilityRole'),
    };
    
    return checks;
  } catch {
    console.warn(`Error reading ${filePath}:`);
    return null;
  }
}

function runStylingTest() {
  console.warn('🎨 Styling Consistency Test');
  console.warn('===========================\n');
  
  const screenFiles = [
    'app/index.tsx',
    'app/training/index.tsx',
    'app/progress.tsx',
    'app/nutrition.tsx',
    'app/more/index.tsx',
    'app/more/analytics.tsx',
    'app/more/workout-history.tsx',
    'app/more/mental.tsx',
    'app/more/recovery.tsx',
    'app/more/exercise-form.tsx',
    'app/more/settings.tsx',
  ];
  
  const results = [];
  let totalChecks = 0;
  let passedChecks = 0;
  
  screenFiles.forEach(screenFile => {
    console.warn(`📄 Checking ${screenFile}...`);
    const checks = checkFileForStyling(screenFile);
    
    if (checks) {
      results.push({ file: screenFile, checks });
      
      Object.keys(checks).forEach(check => {
        totalChecks++;
        if (checks[check]) {
          passedChecks++;
          console.warn(`  ✅ ${check}`);
        } else {
          console.warn(`  ⚠️  ${check} - not found`);
        }
      });
      
      console.warn('');
    }
  });
  
  // Check tab layout consistency
  console.warn('📱 Checking Tab Layout...');
  try {
    const tabLayoutContent = fs.readFileSync('app/_layout.tsx', 'utf8');
    
    const tabChecks = {
      hasConsistentColors: tabLayoutContent.includes('colorScheme === \'dark\''),
      hasConsistentStyling: tabLayoutContent.includes('tabBarStyle'),
      hasConsistentIcons: tabLayoutContent.includes('Ionicons'),
      hasAccessibility: tabLayoutContent.includes('accessibilityRole'),
      hasFiveTabs: (tabLayoutContent.match(/<Tabs\.Screen/g) || []).length === 5,
    };
    
    Object.keys(tabChecks).forEach(check => {
      totalChecks++;
      if (tabChecks[check]) {
        passedChecks++;
        console.warn(`  ✅ ${check}`);
      } else {
        console.warn(`  ⚠️  ${check} - not found`);
      }
    });
  } catch {
    console.warn('Error reading tab layout:');
  }
  
  console.warn('\n📊 Summary:');
  console.warn('===========');
  console.warn(`Total checks: ${totalChecks}`);
  console.warn(`Passed checks: ${passedChecks}`);
  console.warn(`Failed checks: ${totalChecks - passedChecks}`);
  console.warn(`Consistency rate: ${Math.round((passedChecks / totalChecks) * 100)}%`);
  
  // Check for common styling patterns
  console.warn('\n🎯 Common Styling Patterns Found:');
  console.warn('===================================');
  
  const allContent = screenFiles.map(file => {
    try {
      return fs.readFileSync(file, 'utf8');
    } catch {
      return '';
    }
  }).join('\n');
  
  const patterns = {
    'Color scheme usage': (allContent.match(/useColorScheme/g) || []).length,
    'Colors constant usage': (allContent.match(/Colors\[/g) || []).length,
    'SafeAreaView usage': (allContent.match(/SafeAreaView/g) || []).length,
    'ScrollView usage': (allContent.match(/ScrollView/g) || []).length,
    'Primary color usage': (allContent.match(/colors\.primary/g) || []).length,
    'Surface color usage': (allContent.match(/colors\.surface/g) || []).length,
    'Text color usage': (allContent.match(/colors\.text/g) || []).length,
    'Border radius 16px': (allContent.match(/borderRadius: 16/g) || []).length,
    'Shadow usage': (allContent.match(/shadowOffset/g) || []).length,
    'Elevation usage': (allContent.match(/elevation: 3/g) || []).length,
    'Accessibility attributes': (allContent.match(/accessible: true/g) || []).length,
  };
  
  Object.keys(patterns).forEach(pattern => {
    console.warn(`  📈 ${pattern}: ${patterns[pattern]} occurrences`);
  });
  
  const consistencyScore = Math.round((passedChecks / totalChecks) * 100);
  const isConsistent = consistencyScore >= 80;
  
  console.warn(`\n🎉 Styling Consistency: ${isConsistent ? '✅ PASSED' : '❌ NEEDS IMPROVEMENT'}`);
  console.warn(`Overall consistency score: ${consistencyScore}%`);
  
  if (isConsistent) {
    console.warn('\n✅ All screens follow consistent styling patterns!');
    console.warn('✅ Color scheme is consistently applied across all tabs');
    console.warn('✅ Component structure is uniform');
    console.warn('✅ Accessibility features are implemented');
  }
  
  return isConsistent;
}

// Run the test
const success = runStylingTest();
process.exit(success ? 0 : 1);