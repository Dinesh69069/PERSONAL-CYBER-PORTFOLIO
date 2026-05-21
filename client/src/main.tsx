import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const normalizeGithubPagesPath = () => {
	const { search, pathname, hash } = window.location;

	if (!search.startsWith("?/")) {
		return;
	}

	const redirectPath = search.slice(2);
	const normalizedSuffix = redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`;
	const normalizedPath = pathname.replace(/\/$/, "") + normalizedSuffix;

	window.history.replaceState(null, "", `${normalizedPath}${hash}`);
};

normalizeGithubPagesPath();

createRoot(document.getElementById("root")!).render(<App />);
