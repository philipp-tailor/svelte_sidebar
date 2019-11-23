export const areObjectsEqual = (object1, object2) =>
	JSON.stringify(object1) !== JSON.stringify(object2)

export default areObjectsEqual
