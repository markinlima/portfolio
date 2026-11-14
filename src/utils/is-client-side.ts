export function IsClientSide() {
	return typeof window !== "undefined";
}
