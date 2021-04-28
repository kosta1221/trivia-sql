import React, { useEffect } from "react";
import { useRouter } from "./useRouter";

function LandingPage({ isPlayer }) {
	const router = useRouter();

	useEffect(() => {
		if (isPlayer) {
			router.push("/home");
		} else {
			router.push("/login");
		}
	}, [router]);

	return <></>;
}

export default LandingPage;
