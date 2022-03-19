# Island Generator

React web application developed on a 72 hours interview test. The whole app's configuration is created by [Create React App](https://create-react-app.dev/).

## Description

The application should render a world as a grid of cells, the cells have two state: filled(land/green) and unfilled(water/blue).

The user can change the size of the grid and see the number of filled cells and islands in the world. An island is any filled cell with 0 or more adjacent cells on the Y or X axis(diagonal isn't adjacent here).

## Folder Structure

The folder structure is meant to make files import only from the `/algorithms`, `/utils`, or `/components` folder or from its siblings/childs. The react components are organized by a folder with its name and a `index.tsx` file and a `styles.css`. The only except for these rules are if the file is in the `__tests__` folder.

| File/Folder         | Description                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| `public/index.html` | HTML file that receives the app's JS code.                                                              |
| `src/index.tsx`     | Entry file. Loads the whole React App and render with `ReactDOM`.                                        |
| `src/index.css`     | Global css styles for resetting and normalizing HTML elements.                                          |
| `src/utls.ts`       | Some generic and simple helper and pure functions.                                                      |
| `src/components`    | Main components of the app.                                                                             |
| `src/algorithms`    | folder with any algorithms of the app.                                                                  |
| `src/__tests__`     | folder with all tests, it's organized based on the original folder structure of the application's code. |

## Running the app

On your working directory, open the terminal and run:

```
git clone https://github.com/renancleyson-dev/world-grid.git
cd island-generator && npm install
npm start
```

Open the browser on <http://localhost:3000>.

## Running test

Go to the project folder and run `npm test`
