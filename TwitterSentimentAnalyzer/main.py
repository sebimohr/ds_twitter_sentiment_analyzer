from WebApi.api_setup import ApiSetup

if __name__ == '__main__':
    main_api = ApiSetup()
    main_api.RegisterApiEndpoints().RunApi()
