# Jest template for API

### Commands:
* To run test/s:
```
 npm run test
```

### Optional preconditions with .env:
* `ENV` - custom, local or another one that can be specified at constants
```dotenv
ENV=local
```
* `SPEC_NAMES` - without extension separated by comma:
```dotenv
 SPEC_NAMES=get-all,get
```
* `SPECS_FOLDER_NAME` - certain or relative path to specs
```dotenv
SPECS_FOLDER_NAME=users
```
* `USER_PASSWORD` - to pass for login via api
```dotenv
USER_PASSWORD=yourPassword
```
* `WEB_URL` - custom web url
```dotenv
WEB_URL=yourCustomWebUrl
```
`API_URL` - custom api url
```dotenv
API_URL=yourCustomApiUrl
```
`TEST_RUNNER_TIMEOUT` - general test runner timeout
```dotenv
TEST_RUNNER_TIMEOUT=120_000
```
