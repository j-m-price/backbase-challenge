# backbase

## Pre compiled version (runs from opening index.html)

/pre-built/index.html
or
after running `npm install`,
run `npm run build` and open the index.html from the dist folder.

- solution can be served using `npm run serve`

## Tests

- I added a few examples of Jest tests. But did not go for 100% coverage.
- This is mainly due to time constraints.

- tests can be run using `test:unit`

## Reusability

- Commonly uses scss variables are split into a shared \_varialbes file.

  - Contains font sizes, breakpoints etc.

- Sorting functionality split into a mixin
  - Mixins are used in Vue.js so that functionality can be shared between components.

## State management

- I chose to use Vuex to maintain the app's state.
- This is used for state properties that are used by many components.
- For example, the controls component updates the sort type, then the value is used by the history component.

## Issues

- Background image didn't match designs

  - they weren't exactly the same, so I had to make a decision on how to display it.

- The arrows / briefcase pngs had a white background (non transparent)

  - I just had to remove the background so it was transparent

- Updating the solution so it doesn't need to be hosted

  - It's not something I've had to think about before, but the vue.config.js tweak solved the issue.
  - It basically just sets the build path to relative.

- submitting a transaction

  - When submitting a new transaction, I just re-used one of the other transaction images, as a user image wasnt provided.
  - I assumed the blue color was for online transactions, so new transactions will have the blue left border.
  - always put the new transaction at the top of the history
    - usually I'd just set the sort type to be date descending to solve this.
    - but the spec made it seem like the previous sort should persist
      - so if it was sorted with the oldest transactions first, then the new transaction would still go to the top.

- Known issue with form controls on IE11
