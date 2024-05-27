# Farm Sensor Data Frontend
A nextjs app that communicates with an express server to receive and submit sensor data.

## Setup
1. Install dependencies:
```bash
npm install
```
2. Run the server:
```bash
npm run dev
```
The app will run on port `3000`. Ensure the backend server is also running.

## API Endpoints
### Getting Data
* `GET` `http://backend-url/sensors/data`: Retrieves the latest data for all sensors.
* `POST` `http://backend-url/sensors/data`: Accepts and stores sensor data (sensorId, type, value, timestamp).

If the App URL differs from `http://localhost:3000`, make sure to specify the URL in `src/config/appConfig.ts` of the backend API.


## Testing
Perform the following commands to test the application:
```bash
npm test 
```
or
```bash
npm t 
```