import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                primary: {
                    mid: "#94b7f1",
                    dark: "#6f87ad",
                    darker: "#2d3748",
                },
                button: {
                  primary: {
                      mid: "#4583ea",
                      dark: "#2853a1",
                  }
                }
            }
        }
    }
}