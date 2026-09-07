Component Size matters

Huge Components:

1. Too many responsibilities
2. Too many props
3. Hard to reuse
4. Complex Code

Small Components:

1. 100s of mini-components
2. Too abstracted
   abstracted: to create something new to hide the implementation details of that thing

Find the right balance between too specific and too broad for components.

How to split a ui into components

Four Criteria:

1. Logical separation of content/layout
2. Reusability
3. Responsibilities / complexity
4. Personal Coding style

When to create a new components from bigger components

When in doubt, start with a big component, and then split it into smaller components as it becomes necessary.

Four Criteria:

1. Logical separation of content/layout
   Q: Does the componnet contain pieces of content or layout that don't belong together?

2. Reusability
   Q: Is it possible to reuse part of the component?
   Q: Do you want or need to reuse it?

3. Responsibilities / complexity
   Q: Is the component doing too many different things?
   Q: Does the component rely on too many props?
   Q: Does the component have too many pieces of state and/or effects?
   Q: Is the code, including JSX, too complex/confusing?
4. Personal Coding style
   Q: Do you prefer smaller functions/components?

If the answer is yes to all, you might need a new component.

Creating a new component creates a new abstraction. Abstractions have a cost, because more abstractions require more metnal energy to switch back and forth between components. Don't try to create a new component too early.

Name a component according to what it does or what it displays

Never declare a new component inside another component.

Co-locate related components inside the same files. Don't separate components into different files too early.

An app will have components of many different sizes, big and small.

Small components are:

1. Highly reusable
2. Very low complexity

Big components:

1. Not meant to be reused.

---

3 Component catagories:

1. Stateless / presentational components
   - No state
   - Can receive props and simply present recieved data or other content
   - Usually small and reusable
2. Stateful components
   - Have state
   - Can be reusable
3. Structural components
   - "Pages," "layouts," or "screens" of the app
   - Result of composition
   - Can be huge and nonreusable (don't have to)

Component Composition:

- Combining different components using the children prop (or defined props)
- possible because components don't need to knwo their children in advance  
  Used to:

1. Create highly resusable and flexible components
2. Fix prop drilling (great for layouts)

## Props as an API

When designing a component, think of the copmonent props AS the Public API or public interface of the component.
A component is just an abstraction that encapuslates UI and logic and allow consumers to interact with that component with the API.

The API is for the component consumer, which would be a developer.

Too little props:

1. Not flexible enough
2. Might not be useful

Too many props:

1. Too hard to use
2. Exposing too much complexity
3. Hard to write code
4. Provide good default values

Find the right balances that works for both the creator and consumer.

Event Delegation:

1. Event Delegation is handling events for multiple elements centrally in one single parent element
2. Better for performance and memory; needs only one handler function

3. Add handler to parent (.options)
4. Check for target element (e.target)
5. If target is one of the <button>s, handle the event

Component(instance) life cycle:

1. Mount / initial render
   - Component instance is rendered for the first time
   - Frsh state and props are created

2. Re-Render (optional)
   - Happens when :
   1. State changes
   2. Props change
   3. Parent re-renders
   4. Context changes
3. Unomunt (death)
   - Component instance is destoryed and removed
   - State and props are destroyed

Side Effect: Any interaction between a React component and the world outside the copmonent. Can also think of it as code that actually does something. Examples: data fetching, setting up subscriptions, setting up timers, and manually acessing the Dom, etc.

We need side effects all the time. The make our apps do something. Not in render logic

Can be made in event handlers:

- Triggered by EVENTS: onClick, onSubmit, etc.
- Sometimes this is not enough for the application's needs.

Can be made in Effects:

- Triggered by Rendering
- useEffects
- Effects allow us to write code that will run at different moments of a components life cycle:
  - mount
  - re-render
  - unmount

They produce the same result, but at different moments.

Event Handlers vs. Effects

When:

Event Handler

- Executed when the corresponding event happens e.g onClick, onSubmit, etc.
- Used to react to an event
- preferred way of creating side effects
  Effects:
- Executed after the component mounts (initial render), and after subsequen re-renders(according to dependency array.)
- The exact moment when an effect executes depends on the dependency array.
- Contains an effect and may sometimes return a cleanup function
- Used to keep a component synchronized with some external system (in this example, API movie data) => Thinking about syncronization and not lifecycles

useEffect Dependency Array:

- By default, effects run after every render. Prevent that by passing a dependency array.
- Wtihout the dependency array, react doesn't know when to run the effect
- Each time one of the dependencies changes, the effect will be executed again.
- States ariable and props used inside the effect must be included in the dependency array.
  - e.g if a state called movies was used, it must be included inside the dependency array
  - If not included, a "stale closure" occurs.

useEffect is a SYNCHRONIZATION method.

useEffect is similar to an event listener that is listening for one dependency to change. Whenever dependency changes, it will execute the effect again.

Effects react to updates to state and props used inside the effect. Effects are reactive like state updates re-rendering the ui.

Component state/props => Synchronize with => External System (side effect)

Three Cases of useEffect:

1. useEffect(fn, [x, y, z]) => Effect synchronizes with x, y, and z. => Runs on mount and re-renders triggered by updating x, y, or z.
2. useEffect(fn, []) => Effect synchronizes with no state/prop => Runs on ly on mount (initial render)
3. useEffect(fn) => Effect synchronizes with everything => Runs on every render (usually bad)

Where effects are executed:
.\imgs\when-effects-are-exectued.png

useLayoutEffect: An effect that runs before the browser paints on the screen.

{/_ In event handlers, if the function doesn't need anything passed to it, it can be just inputted as {onCloseMovie} _/}
{/_If the function needs something passed down to it, inside the event handler you must output a function that returns
something e.g onClick={() => onCloseMovie(id)} _/}

Cleanup function:

1. Function that we can return from an effect
2. Runs on two difference occasions:
   - Before teh effect is executed again
   - After a component has unmounted
3. Necessary whenever the side effect keeps happening after the component has been re-rendered or unmounted
4. Each effect should do only one thing. Use one useEffect hook for each side effect
   - Makes easier to clean up

3 array methods

Arrow function notation:

(argument) => 1 + 3

left side: argument
right side: what the function returns

.map((element) => ({})) or .map((element) => {return{}})
If right side is like left side, no return keyword is needed
If right side is like right side, then return is needed.
If return is missing from right side, then nothing will be returned

callback function

1. .map((element) => {})
   - for each element in the array, it will loop through each and the right side can be used for a function
   - returns an array
2. .filter
   - Goes through each element like map, but it will only return the array elements that satify the filter condition i.e a true or false value.
   - returns an array
   - .includes returns true or false (handy with .filter)
3. .reduce
4. .sort

---

CSS GRID NOTES

1. Grid container

- set display: grid; to create it

The children of the grid container are the grid items.

x-axis: row axis (from origin to right)
y-axis: column axis (from origin down)

Axises are always the same and the direction cannot be changed as in flexbox.

The verticle and horizontal lines that divide up the grid and separate the columns and the rows are called the grid lines.

The row lines and the column lines are both automatically numbered starting from 1.

So origin is 1 and increases as you go to the right

So origin is 1 and increases as you go down.

Space between the rows is called the gutter

The row gutter can be different than the column gutter

The space between two grid lines is called a track (not including gutter space)

So space between row lines is called a Grid Row

Space between column lines is called a Grid Column

Area between two vertical and two horizonal grid lines is called a grid area

If that area is between two adjacent grid lines and two adjacent column lines, then that area is called a Grid Cell.

CSS Grid Properties

---

Container

grid-template-rows
grid-template-columns
grid-template-areas

grid-row-gap
grid-column-gap

justify-items
align-items
justify-content
align-content

grid-auto-rows
grid-auto-columns
grid-auto-flow

---

Item

grid-row-start
grid-row-end
grid-column-start
grid-column-end

justify-self
align-self

order

---

ALL DONE IN THE GRID CONTAINER.

grid-template-rows: 150px 150px;

This sets two rows each with a height of 150px.

grid-template-columns: 150px 150px 150px;

This sets 3 columns each with the width of 150px.

Instead of doing it like that, you can do the same by the following: gird-template-columns: repeat(3, 150px);

Add 300px to the end of that line to get a different width column

---

fr Unit

1 fr stand for a fraction of the available space. If you wanted to create 3 columns with the exact same width of the available space do this:
grid-template-columns: repeat(3, 1fr);

Each of these 3 column tracks have the same width

Using percentages for fractions:

grid-template-columns: 50% 1fr 1fr; <= This says create 1 track 50% of the width of the grid container and then 2 tracks 1 fraction each. The percentage doesn't take the gap into account

fr is really dependent on the grid height and width

grid-row-gap: 30px;

This sets a row gutter of 30px

grid-column-gap: 30px;

This sets a column gutter of 30px

grid-gap: 30px;

This does both of what the two lines above did into one.

This is ALL done in the grid container container.

---

Setting a grid-item to a specific grid-cell

On the grid-item class:

grid-row-start: 2;
grid-row-end: 3;

Or can be written like this: grid-row: start-row / end-row => grid-row: 2 / 3;

grid-column-start: 2;
grid-column-end: 3;
Or can be written like this: grid-column: start-col / end-col => grid-column: 2 / 3;

Both of the grid-row and grid-column can be combined into _grid-area_

grid-area: row-start / column-start / row-end / column-end

So the combination of the previous two lines:

grid-area: 2 / 2 / 3 / 3;

---

SPANNING GRID ITEMS ACROSS MULTIPLE CELLS:

Make the start and end values larger than 1

grid-row-start: 2
grid-row-end: 4

This might create an implicit grid to put any grid-items that don't have space.

Multiple grid items can occupy the same grid-cell if both are explicitly set to a specific cell. To display one above the other change the z-index value on each grid-item e.g z-index: 10;

Another way is to define where the row and column starts and then how many grid-cells to span

grid-row: 2 / span 2

If you want to it to span from a specific start till the end of the grid, put -1 at the end

grid-row: 2 / -1;

This doesn't create an extra row or column

---

NAMING GRID LINES

---

NAMING GRID AREAS
//names for each cell
grid-template-areas:

"head head head head"
"box box box side"
"main main main side"
"foot foot foot foot";

Put a . for an empty cell

Then for each grid-item class, write the name of the grid-cell name

.header {
grid-area: head;
}

In order for this to work, make sure it is a complete representation of the grid declared in the grid-container using grid-template-rows and grid-template-columns e.g 4x4 or 4x2 etc.

This is practical for small layouts like 4x4 or 5x5 but for really large layouts like 10-15 lines, naming grid-lines is easier.

In the grid-container, using grid-auto-rows: 80px defines the height of the automatically added tracks.

Why are implicit rows added as rows and not as columns. This is because grid-auto-flow is automatically set to row. Changes this property to colulmn in the grid container and it add implicit columns.

Then use: grid-auto-columns: .5fr;

---

ALIGNING GRID ITEMS

This is done on the grid-container.

align-items aligns items across the column axis

align-items: center; will align the grid-item towards the vertical middle of the grid-area for each item

_align-items is by default set to stretch, which explains why the grid-items were taking up all the space of its designated grid-area_

align-items: stretch / center / end / start <= ONE VALUE

justify-items aligns the grid-items across the row axis or horizontally.

justify-items: center; centers the grid-item horizontally in the grid-area.

_justify-items default is set to stretch_

To override this alignment, either align-items or justify-items, on an individual grid-item use align-self and/or justify-self with the same values of stretch / center / end / start

DONE ON THE GRID-ITEM I.E GRID-CHILD.

---

ALIGNING TRACKS

Done in the grid-container:

justify-content: center; // center /start / end /space-between / space-around / space-evenly // horizontal direction
align-content: center // vertical direction

greid-auto-flow: row dense; fills holes
