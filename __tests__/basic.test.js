describe('Basic Test Setup', () => {
  test('should pass a simple test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should handle async operations', async () => {
    const result = await Promise.resolve('success');
    expect(result).toBe('success');
  });

  test('should handle object matching', () => {
    const obj = { name: 'Hell Week App', version: '1.0.0' };
    expect(obj).toEqual({
      name: 'Hell Week App',
      version: '1.0.0'
    });
  });
});