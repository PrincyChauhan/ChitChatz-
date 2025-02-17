import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import daisyui from "daisyui";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(), daisyui()],
// });

export default defineConfig({
  plugins: [
    react(),
    // tailwindcss({
    //   plugins: [daisyui], // ✅ Now DaisyUI is integrated inside Vite
    // }),
  ],
});
