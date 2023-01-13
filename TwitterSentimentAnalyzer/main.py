from pathlib import Path

from WebApi.api_setup import ApiSetup

if __name__ == '__main__':
    cache_path = Path.joinpath(Path.cwd(), "Cache")
    if not Path.exists(cache_path):
        Path.mkdir(cache_path)
    
    main_api = ApiSetup(9001)
    main_api.RegisterApiEndpoints().RunApi()
