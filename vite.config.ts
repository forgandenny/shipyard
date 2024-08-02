import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins:
          mode === "production"
            ? [
                [
                  "react-remove-properties",
                  {
                    properties: ["data-testid"],
                  },
                ],
              ]
            : [],
      },
    }),
  ],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
    coverage: {
      provider: "istanbul",
      reporter: ["json-summary", "lcov"], // or 'v8'
    },
  },
}))
