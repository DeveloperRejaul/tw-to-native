export const getTailwindNumericValue = (
  className: string,
): number | undefined => {
  const numericValue = className.match(/\d+$/);
  return numericValue ? parseInt(numericValue[0], 10) : undefined;
};

export const getTailwindColor = (className: string): string | undefined => {
  const colorMap: { [key: string]: string } = {
    'bg-blue-500': '#3B82F6',
    'bg-red-500': '#EF4444',
    // Add more color mappings as needed
  };
  return colorMap[className];
};
