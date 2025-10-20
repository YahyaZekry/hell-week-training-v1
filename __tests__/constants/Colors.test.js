import { Colors } from '../../src/constants/Colors';

describe('Colors Constants', () => {
  describe('Light Theme', () => {
    test('should have all required light theme colors', () => {
      const { light } = Colors;
      
      expect(light).toHaveProperty('primary', '#007AFF');
      expect(light).toHaveProperty('secondary', '#5856D6');
      expect(light).toHaveProperty('accent', '#FF9500');
      expect(light).toHaveProperty('success', '#34C759');
      expect(light).toHaveProperty('warning', '#FF9500');
      expect(light).toHaveProperty('error', '#FF3B30');
      expect(light).toHaveProperty('background', '#FFFFFF');
      expect(light).toHaveProperty('surface', '#F2F2F7');
      expect(light).toHaveProperty('selected', '#F0F8FF');
      expect(light).toHaveProperty('text', '#000000');
      expect(light).toHaveProperty('textSecondary', '#3C3C43');
      expect(light).toHaveProperty('border', '#C6C6C8');
      expect(light).toHaveProperty('shadow', 'rgba(0, 0, 0, 0.1)');
    });

    test('should have valid hex color formats', () => {
      const { light } = Colors;
      const hexColors = [
        light.primary, light.secondary, light.accent, 
        light.success, light.warning, light.error,
        light.background, light.surface, light.selected,
        light.text, light.textSecondary, light.border
      ];
      
      hexColors.forEach(color => {
        expect(color).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
      });
    });
  });

  describe('Dark Theme', () => {
    test('should have all required dark theme colors', () => {
      const { dark } = Colors;
      
      expect(dark).toHaveProperty('primary', '#0A84FF');
      expect(dark).toHaveProperty('secondary', '#5E5CE6');
      expect(dark).toHaveProperty('accent', '#FF9F0A');
      expect(dark).toHaveProperty('success', '#30D158');
      expect(dark).toHaveProperty('warning', '#FF9F0A');
      expect(dark).toHaveProperty('error', '#FF453A');
      expect(dark).toHaveProperty('background', '#000000');
      expect(dark).toHaveProperty('surface', '#1C1C1E');
      expect(dark).toHaveProperty('selected', '#F0F8FF');
      expect(dark).toHaveProperty('text', '#FFFFFF');
      expect(dark).toHaveProperty('textSecondary', '#EBEBF5');
      expect(dark).toHaveProperty('border', '#38383A');
      expect(dark).toHaveProperty('shadow', 'rgba(255, 255, 255, 0.1)');
    });

    test('should have valid hex color formats', () => {
      const { dark } = Colors;
      const hexColors = [
        dark.primary, dark.secondary, dark.accent, 
        dark.success, dark.warning, dark.error,
        dark.background, dark.surface, dark.selected,
        dark.text, dark.textSecondary, dark.border
      ];
      
      hexColors.forEach(color => {
        expect(color).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
      });
    });
  });

  describe('Theme Consistency', () => {
    test('should have consistent color properties between themes', () => {
      const { light, dark } = Colors;
      
      const lightKeys = Object.keys(light).sort();
      const darkKeys = Object.keys(dark).sort();
      
      expect(lightKeys).toEqual(darkKeys);
    });

    test('should have contrasting background colors', () => {
      const { light, dark } = Colors;
      
      expect(light.background).toBe('#FFFFFF');
      expect(dark.background).toBe('#000000');
      expect(light.background).not.toBe(dark.background);
    });

    test('should have contrasting text colors', () => {
      const { light, dark } = Colors;
      
      expect(light.text).toBe('#000000');
      expect(dark.text).toBe('#FFFFFF');
      expect(light.text).not.toBe(dark.text);
    });
  });
});