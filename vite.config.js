// import { resolve } from "path";
import { defineConfig } from "vite";
import jsconfigPaths from "vite-jsconfig-paths";

export default defineConfig({
	plugins: [jsconfigPaths()],
	build: {
		target: "ESNext",
		sourcemap: true,
		rollupOptions: {
			output: {
				exports: "named",
			},
		},
	},
});
