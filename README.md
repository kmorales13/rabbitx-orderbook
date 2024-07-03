# RabbitX Orderbook

RabbitX Orderbook is a real-time orderbook application for cryptocurrency markets, built using React.js and Centrifuge for WebSocket communication. It provides users with up-to-date information on buy and sell orders, allowing them to make informed trading decisions.

## Project Description

The RabbitX Orderbook application fetches orderbook data from the RabbitX API using WebSocket communication. It displays the data in a user-friendly format, showing buy (bids) and sell (asks) orders for selected cryptocurrency markets. The application also includes a market price indicator, indicating the direction (up or down) of the last trade price.

## Approach

The project follows a component-based architecture, with separate components for the orderbook table, market price indicator, and WebSocket connection management. It uses TypeScript for static typing and Tailwind CSS for styling, ensuring a responsive and visually appealing user interface.

The application maintains a WebSocket connection to the RabbitX API using the Centrifuge library. It listens for updates to the orderbook and updates the UI in real time, providing users with the latest market data.

## Challenges Faced

One challenge faced during development was managing the state of the orderbook efficiently. Since the orderbook data can be large and updates can occur frequently, optimizing the rendering performance was crucial. This was addressed by using React's `useRef` to update the local state and an interval to update the UI, optimizing the component re-renders.

Another challenge was handling WebSocket connection errors and reconnections. Implementing logic to reconnect to the WebSocket server in case of disconnection and handling errors gracefully was important to ensure a smooth user experience.

## Possible Improvements

- **Performance Optimization**: Further optimizations can be made to improve the performance of the application, such as implementing memoization and lazy loading techniques.
- **Additional Features**: Adding more features, such as historical orderbook data, advanced charting tools, and user customization options, could enhance the application's functionality.
- **User Authentication**: Implementing user authentication and account management features could allow users to save their preferences and trading settings.
- **Testing**: Increasing test coverage with unit tests and integration tests to ensure the application functions as expected in different scenarios.
