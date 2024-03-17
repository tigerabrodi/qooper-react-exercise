# Qooper TodoApp

This is a Todo App built with React and Mock API.

Design can be found here: [Figma](https://www.figma.com/file/oWgvLwCXRPrXTQGnq8atW3/To-Do-APP?nodeid=2%3A2).

See the app live here: [Qooper TodoApp](https://qooper-react-exercise.vercel.app).

# Demo

https://github.com/tigerabrodi/qooper-react-exercise/assets/49603590/158c4377-94b4-459d-a357-772508aafc5a

# Run it locally

## Install dependencies

After cloning the repository, install the dependencies with the following command:

```
npm install
```

## Start the app

To start the app, run the following command:

```
npm run dev
```

## Run tests

To run the tests, run the following command:

```
npm run test
```

If you want to see it in the UI, run the following command:

```
npm run test:ui
```

## Storybook

To run the storybook, run the following command:

```
npm run storybook
```

# Thought process

Looking at the design, we already had reusable components designed. I decided to use Storybook to build the components in isolation and then start building the app.

# Architecture

Let's go over the architecture folder by folder within `src`.

## Components

This folder contains all the reusable components that are used in the app. Each component has its own folder with the component file and a `stories.tsx` file for Storybook.

## Pages

This folder contains the routes of the app.

## Context

This folder contains the different contexts used in the app. We one for the todos and one for the user information.

`AppProviders` is a component that wraps the entire app with the different required contexts.

## Hooks

This folder contains custom hooks used in the app.

## Services

This folder contains all the functions that interact with the API.

## Helpers

This folder contains additional helpers, such as constants, types, and utilities.

# Testing

For testing, I used Vitest and Testing Library. I wrote tests for the SignIn and Todo routes.

I'm a big fan of testing library because it allows me to test the app as a user would interact with it.

I'm using Mock Service Worker (MSW) to mock the API calls. MSW is a library that allows you to mock fetch requests at the right layer. Instead of mocking the fetch function, it mocks at the service worker level. So when you make a request, the request is intercepted and MSW lets you define the response.

# Accessibility

I built the app with accessibility in mind. I used semantic HTML and added ARIA attributes where necessary. This is also where Testing Library helps, because of its accessible queries. It helped me spot areas where I could improve the accessibility of the app.

An example is the `Input` component where I added a hidden label associated with the input to give it an accessible name. It's hidden visually but screen readers can still read it.

# Notes

- To improve the creation of a new task, I would add a submit button to the form to improve the user experience. We could e.g show the button as disabled if the input is empty.
- Some more space between the input and error message would look nicer, but I stuck to the Figma design for now.
- For Accessibility purposes, placeholders should be avoided as labels:

  - Screen readers all may not voice the placeholders.
  - Visibility: placeholders disappear when user types, so user may forget what the input is for.
  - Low contrast: placeholders typically have low contrast, so it may be hard to read for some users.

- To give the user some feedback when creating/editing/deleting a task, I added a disabled state during submission states.
- I added tests for the button component for the sake of the assignment. However, it didn't feel necessary because we don't gain any new confidence by testing it. It's a simple component and not e.g. an Accordion component where we could test the open/close state as the user interacts with it.
- Since I'm using TypeScript, I didn't add JSDoc, but I added TSDoc comments to the components' props.
- To the creation experience, I focus on the input once user is done creating a task. This way, the user can continue creating tasks without having to click on the input again.

# Tech Stack

- React
- TypeScript
- Styled Components
- Storybook
- Vitest
- Testing Library
