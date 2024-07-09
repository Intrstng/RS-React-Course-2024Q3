export const vehiclesAPI = {
  getVehicles: async (value: string = '', page: number = 1) => {
    const response = await fetch(
      `https://swapi.dev/api/vehicles?search=${value}&page=${page}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
};
