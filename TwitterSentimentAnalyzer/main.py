from pathlib import Path

from WebApi.api_setup import ApiSetup
import pip

def install(package):
    if hasattr(pip, 'main'):
        pip.main(['install', package])

if __name__ == '__main__':
    cache_path = Path.joinpath(Path.cwd(), "Cache")
    if not Path.exists(cache_path):
        Path.mkdir(cache_path)
    
    install("flask")
    install("flask_restful")
    install("flask_cors")
    install("pandas")
    install("tweepy")
    install("python-dotenv")
    install("textblob")
    
    main_api = ApiSetup(9001)
    main_api.RegisterApiEndpoints().RunApi()
