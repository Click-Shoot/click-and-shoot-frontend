import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                primary: {
                    mid: "#AEC5EB",
                    dark: "#6b89bd"
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