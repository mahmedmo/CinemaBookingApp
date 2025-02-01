import React, { useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export const TopLoadingBar: React.FC = () => {
	const ref = useRef<LoadingBarRef>(null);
	const startLoading = () => ref.current?.continuousStart();
	const stopLoading = () => ref.current?.complete();

	return (
		<div>
			<LoadingBar color="#e50914" ref={ref} height={3} />
			<button onClick={startLoading}>Start Loading</button>
			<button onClick={stopLoading}>Stop Loading</button>
		</div>
	);
};
