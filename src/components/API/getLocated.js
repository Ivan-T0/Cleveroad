export const getLocated = async () => {
  try {
    const response = await fetch("http://api.open-notify.org/iss-now.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch ISS location: ${response.status}`);
    }
    const located = await response.json();
    return located;
  } catch (error) {
    console.error("Failed to fetch ISS location:", error);
    throw error;
  }
};
export const getAstros = async () => {
  const response = await fetch("http://api.open-notify.org/astros.json");
  if (!response.ok) {
    throw new Error("Failed to fetch astronaut data");
  }
  const list = await response.json();
  return list;
};
