from WebApi.api_setup import ApiSetup

if __name__ == '__main__':
    main_api = ApiSetup(9001)
    main_api.RegisterApiEndpoints().RunApi()
