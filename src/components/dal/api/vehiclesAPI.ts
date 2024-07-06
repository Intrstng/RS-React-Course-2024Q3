export const vehiclesAPI = {
  getVehicles: async () => {
    const response = await fetch('https://swapi.dev/api/vehicles?page=1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
  searchVehicles: async (value: string) => {
    const response = await fetch(
      `https://swapi.dev/api/vehicles?search=${value}&page=1`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
};
