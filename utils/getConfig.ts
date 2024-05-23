import type Config from "~/@types/config"

export default function (): Config {
    const app_config = useAppConfig()

    let config: object = app_config.config as object
    if (process.dev)
        config = {
            ...config,
            ...app_config.devConfig as object,
            dev: true
        }
    return config as Config
}