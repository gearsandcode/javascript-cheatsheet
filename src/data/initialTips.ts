import { Tip } from "../types";
import { v4 as uuidv4 } from "uuid";

export const initialTips: Tip[] = [
  // Arrays
  {
    id: uuidv4(),
    title: "Array Methods",
    description: "",
    codeSnippet: `const fruits = ['apple', 'banana', 'orange', 'grape'];

// pop() - removes and returns last element
console.log(fruits.pop()); // 'grape'
console.log(fruits); // ['apple', 'banana', 'orange']

// push() - adds to end
fruits.push('mango');
console.log(fruits); // ['apple', 'banana', 'orange', 'mango']

// splice() - removes/replaces elements
fruits.splice(1, 2, 'kiwi'); // remove 2 items at index 1, insert 'kiwi'
console.log(fruits); // ['apple', 'kiwi', 'mango']

// slice() - returns portion of array
console.log(fruits.slice(1)); // ['kiwi', 'mango']
console.log(fruits.slice(0, 2)); // ['apple', 'kiwi']`,
    categories: ["Arrays"],
  },

  // Then add a new tip for transformation array methods
  {
    id: uuidv4(),
    title: "Array Transformation Methods",
    description: "Methods for transforming arrays into new arrays or values.",
    codeSnippet: `const numbers = [1, 2, 3, 4, 5];


// map() - transform elements
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() - keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce() - accumulate values
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// find() - get first element that passes test
const found = numbers.find(n => n > 3);
console.log(found); // 4

// some() & every() - test conditions
const hasEven = numbers.some(n => n % 2 === 0); // true
const allPositive = numbers.every(n => n > 0); // true`,
    categories: ["Arrays"],
  },

  // Async
  {
    id: uuidv4(),
    title: "Promise Basics",
    description:
      "A Promise represents an eventual result of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected.",
    codeSnippet: `// Creating a Promise
const promise = new Promise((resolve, reject) => {
  const success = true;
  
  if (success) {
    resolve('Operation successful!');
  } else {
    reject(new Error('Operation failed!'));
  }
});

// Using the Promise
promise
  .then(result => console.log(result))
  .catch(error => console.error(error));`,
    categories: ["Async"],
  },
  {
    id: uuidv4(),
    title: "Promise Chaining",
    description:
      "Promises can be chained to handle a sequence of asynchronous operations, making the code more readable and maintainable.",
    codeSnippet: `// Simulated API calls
const getUser = (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: 'John' });
    }, 1000);
  });
};

const getUserPosts = (user) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
      ]);
    }, 1000);
  });
};

// Chain promises
getUser(1)
  .then(user => {
    console.log('User:', user);
    return getUserPosts(user);
  })
  .then(posts => {
    console.log('Posts:', posts);
  })
  .catch(error => {
    console.error('Error:', error);
  });`,
    categories: ["Async"],
  },
  {
    id: uuidv4(),
    title: "What is the event loop?",
    description:
      "The event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.",
    codeSnippet: `console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

Promise.resolve()
  .then(() => console.log('Promise 1'));

console.log('End');

// Output:
// Start
// End
// Promise 1
// Timeout 1`,
    categories: ["Async"],
  },

  // ES6
  {
    id: uuidv4(),
    title: "Generator Functions",
    description:
      "Generator functions can pause execution using yield and resume later, making them perfect for creating iterators and handling sequences of values.",
    codeSnippet: `// Basic Generator
function* numberSequence() {
  yield 1;
  yield 2;
}

// Using the generator
const generator = numberSequence();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: undefined, done: true }

// Infinite Fibonacci sequence generator
function* fibonacci() {
  let prev = 0, curr = 1;
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

// Using the fibonacci generator
const fib = fibonacci();
for (let i = 0; i < 6; i++) {
  console.log(fib.next().value);
}
// Output: 1, 1, 2, 3, 5, 8

// Generator with input using next()
function* conversation() {
  const name = yield "What's your name?";
  const age = yield \`Hello \${name}, how old are you?\`;
  yield \`\${name} is \${age} years old!\`;
}

const chat = conversation();
console.log(chat.next().value);        // What's your name?
console.log(chat.next('John').value);  // Hello John, how old are you?
console.log(chat.next('25').value);    // John is 25 years old!`,
    categories: ["ES6", "Fundamentals"],
  },

  // Numbers
  {
    id: uuidv4(),
    title: "Number Operations",
    description:
      "Common number operations including rounding, random numbers, and mathematical functions.",
    codeSnippet: `// Rounding methods
console.log(Math.ceil(3.1));   // 4
console.log(Math.floor(3.9));  // 3
console.log(Math.round(3.5));  // 4
console.log(Math.trunc(3.9));  // 3

// Random numbers
console.log(Math.random());     // 0 to 0.999...
console.log(Math.random() * 10);// 0 to 9.999...

// Get random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomInt(1, 10)); // 1 to 10

// Other Math methods
console.log(Math.abs(-5));     // 5
console.log(Math.pow(2, 3));   // 8
console.log(Math.sqrt(16));    // 4
console.log(Math.min(2, 5, 1));// 1
console.log(Math.max(2, 5, 1));// 5`,
    categories: ["Numbers"],
  },
  {
    id: uuidv4(),
    title: "Parsing Numbers",
    description:
      "Using parseInt() and parseFloat() to convert strings to numbers with different bases and decimal points.",
    codeSnippet: `// parseInt() with different bases
console.log(parseInt('42')); // 42
console.log(parseInt('42px')); // 42

// parseFloat() for decimals
console.log(parseFloat('3.14')); // 3.14
console.log(parseFloat('3.14.15')); // 3.14`,
    categories: ["Numbers"],
  },

  // OOP
  {
    id: uuidv4(),
    title: "Constructor Functions",
    description:
      "Constructors are special functions that create and initialize objects. They provide a way to create multiple instances of objects with the same properties and methods.",
    codeSnippet: `// Constructor function
function User(name, email) {
  // 'this' refers to the new object being created
  this.name = name;
  this.email = email;
  
  // Instance method
  this.sayHello = function() {
    return \`Hello, I'm \${this.name}\`;
  };
}

// Adding methods to prototype (more memory efficient)
User.prototype.getEmail = function() {
  return this.email;
};

// Creating instances using 'new' keyword
const user1 = new User('John', 'john@example.com');
const user2 = new User('Jane', 'jane@example.com');

console.log(user1.sayHello()); // "Hello, I'm John"
console.log(user2.getEmail()); // "jane@example.com"

// What happens if we forget 'new'?
const user3 = User('Bob', 'bob@example.com'); // undefined
// 'this' refers to global object (window in browser)

// ES6 Class equivalent
class UserClass {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  sayHello() {
    return \`Hello, I'm \${this.name}\`;
  }
  
  getEmail() {
    return this.email;
  }
}`,
    categories: ["OOP"],
  },
  {
    id: uuidv4(),
    title: "Can you explain prototypal inheritance?",
    description:
      "JavaScript objects have a special hidden property [[Prototype]] that links to another object. This creates an inheritance chain.",
    codeSnippet: `// Constructor function
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound\`;
};

// Inherit from Animal
function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog('Rex');
console.log(dog.speak()); // "Rex makes a sound"`,
    categories: ["OOP"],
  },

  // Patterns
  {
    id: uuidv4(),
    title: "Module Pattern and Closures",
    description:
      "The module pattern uses closures to create private state and expose a public API. A closure is a function that retains access to variables in its outer scope even after the outer function has returned.",
    codeSnippet: `// Module Pattern using Closure
const createCounter = () => {
  // Private variables (closure scope)
  let count = 0;
  
  // Public API
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    }
  };
};

// Usage
const counter = createCounter();
console.log(counter.getCount()); // 0
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1

// count is private and cannot be accessed directly
console.log(counter.count); // undefined

// Each instance has its own private state
const counter2 = createCounter();
console.log(counter2.getCount()); // 0
console.log(counter.getCount()); // 1`,
    categories: ["Patterns"],
  },

  // React
  {
    id: uuidv4(),
    title: "React Best Practices",
    description:
      "Essential React best practices for writing maintainable and performant applications.",
    codeSnippet: `// Use functional components with hooks
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser); // Fetch on userId change
  }, [userId]);
  
  if (!user) return <Loading />; // Early return for loading state
  
  return <div>{user.name}</div>;
};

// Custom hooks for reusable logic
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // Cleanup
  }, [value, delay]);
  
  return debouncedValue;
};

// Proper event handler naming and fragments
const List = () => (
  <>
    <ListItem onClick={handleItemClick} /> {/* Use descriptive handler names */}
    <ListItem onClick={handleItemClick} />
  </>
);`,
    categories: ["React", "Best Practices"],
  },
  {
    id: uuidv4(),
    title: "React Debugging Techniques",
    description: "",
    codeSnippet: `// React Developer Tools - Install Chrome/Firefox extension
const App = () => (
  <React.StrictMode> {/* Helps catch bugs early */}
    <MainComponent />
  </React.StrictMode>
);

// Console debugging with component lifecycle
function DebugComponent({ prop }) {
  console.log('Render:', { prop }); // Log render with props
  if (prop.isInvalid) debugger; // Conditional breakpoint
  return <div>{prop.value}</div>;
}

// Error Boundaries for graceful error handling
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    console.error('Error:', error);
    console.log('Stack:', info.componentStack);
  }
  
  render() {
    return this.state.hasError 
      ? <h1>Something went wrong.</h1>
      : this.props.children;
  }
}

// Performance profiling
const onRenderCallback = (id, phase, actualDuration) => {
  console.log(\`Component: \${id}, Phase: \${phase}, Duration: \${actualDuration}ms\`);
};

<Profiler id="Navigation" onRender={onRenderCallback}>
  <Navigation />
</Profiler>`,
    categories: ["React", "Debugging"],
  },
  {
    id: uuidv4(),
    title: "SSR vs CSR in React",
    description:
      "Comparison of Server-Side Rendering (SSR) and Client-Side Rendering (CSR) approaches in React applications.",
    codeSnippet: `// Server-Side Rendering (SSR)
// Pros: Better initial load, SEO friendly, great for static content, better on slow devices
// Cons: Higher server load, more complex setup, full page reloads, higher hosting costs

// Next.js SSR Example
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data');
  return { props: { data } };
}

// Client-Side Rendering (CSR)
// Pros: Rich interactions, faster navigation after initial load, lower server load, simpler development
// Cons: Slower initial load, SEO challenges, initial blank page

function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  if (!data) return <Loading />;
  return <div>{/* Render data */}</div>;
}

// Hybrid Approaches
// 1. Static Site Generation (SSG): Build-time rendering, best performance, limited to static content
// 2. Incremental Static Regeneration (ISR): SSG with periodic rebuilds, good balance
// 3. Progressive Hydration: Critical path SSR, lazy load non-critical components`,
    categories: ["React", "Architecture"],
  },
  {
    id: uuidv4(),
    title: "React vs Vue vs Next.js",
    description:
      "Comparison of popular JavaScript frameworks: React, Vue, and Next.js.",
    codeSnippet: `// React
// Pros: Large ecosystem, flexible, strong community, great for large apps, JSX
// Cons: More boilerplate, requires additional libraries, steeper learning curve

function ReactComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

// Vue
// Pros: Gentle learning curve, built-in features, better performance, single file components
// Cons: Smaller ecosystem, less flexibility, fewer job opportunities

// Next.js
// Pros: Built-in SSR/SSG, file-based routing, API routes, zero config, great DX
// Cons: React knowledge required, more complex deployment, higher hosting costs`,
    categories: ["React", "Frameworks", "Comparison"],
  },
  // First tip focused on basic operations
  {
    id: uuidv4(),
    title: "Basic String Operations",
    description: "Essential string manipulation operations.",
    codeSnippet: `const str = '  Hello World!  ';

// Case conversion
console.log(str.toLowerCase());     // "  hello world!  "
console.log(str.toUpperCase());     // "  HELLO WORLD!  "

// Trimming whitespace
console.log(str.trim());           // "Hello World!"
console.log(str.trimStart());      // "Hello World!  "
console.log(str.trimEnd());        // "  Hello World!"

// Template literals
const name = 'John';
const age = 30;
console.log(\`\${name} is \${age} years old\`); // "John is 30 years old"`,
    categories: ["Strings"],
  },

  // Second tip focused on searching and modifying
  {
    id: uuidv4(),
    title: "String Search & Substrings",
    description: "Methods for searching and extracting parts of strings.",
    codeSnippet: `const str = 'Hello World!';

// Searching and replacing
console.log(str.includes('World')); // true
console.log(str.startsWith('Hello')); // true
console.log(str.endsWith('!')); // true
console.log(str.indexOf('World')); // 6
console.log(str.replace('World', 'JavaScript')); // "Hello JavaScript!"

// Splitting and joining
const words = str.split(' ');
console.log(words); // ["Hello", "World!"]
console.log(words.join('-')); // "Hello-World!"
console.log(str.split('').reverse().join('')); // "!dlroW olleH"

// Substring operations
console.log(str.slice(0, 5));     // "Hello"
console.log(str.substring(6, 11));  // "World"
console.log(str.substr(6, 5));     // "World"`,
    categories: ["Strings"],
  },

  // TypeScript
  {
    id: uuidv4(),
    title: "TypeScript Generics",
    description:
      "Generics allow you to write flexible, reusable functions and classes that work with different types while maintaining type safety.",
    codeSnippet: `// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface Box<T> {
  contents: T;
}

// Generic class
class Queue<T> {
  private data: T[] = [];
  
  push(item: T) {
    this.data.push(item);
  }
  
  pop(): T | undefined {
    return this.data.shift();
  }
}

// Usage examples
const numberQueue = new Queue<number>();
numberQueue.push(123);

const stringBox: Box<string> = {
  contents: "Hello TypeScript"
};

// Constraint on generic type
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}`,
    categories: ["TypeScript", "Generics"],
  },
  {
    id: uuidv4(),
    title: "TypeScript Union and Intersection Types",
    description:
      "Union types allow a value to be one of several types, while intersection types combine multiple types into one.",
    codeSnippet: `// Union type
type StringOrNumber = string | number;

function processValue(value: StringOrNumber) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
}

// Intersection type
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

type Person = HasName & HasAge;

const person: Person = {
  name: "John",
  age: 30
};

// Discriminated unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}`,
    categories: ["TypeScript", "Types"],
  },
  {
    id: uuidv4(),
    title: "TypeScript Utility Types",
    description:
      "TypeScript includes several utility types to facilitate common type transformations.",
    codeSnippet: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Partial - Makes all properties optional
type PartialUser = Partial<User>;

// Required - Makes all properties required
type RequiredUser = Required<User>;

// Pick - Constructs a type with selected properties
type UserBasics = Pick<User, "name" | "email">;

// Omit - Constructs a type without specified properties
type UserWithoutId = Omit<User, "id">;

// Record - Creates a type with specified properties
type UserRoles = Record<"admin" | "user", User>;
// { admin: User; user: User; }

// ReturnType - Extracts return type of a function
function createUser(name: string): User {
  return { id: 1, name, email: \`\${name}@example.com\` };
}
type NewUser = ReturnType<typeof createUser>;
// type NewUser = User`,
    categories: ["TypeScript", "Types"],
  },
  {
    id: uuidv4(),
    title: "TypeScript Basic Type Guards",
    description: "Essential type guards for everyday TypeScript development.",
    codeSnippet: `// typeof type guard
  function processValue(value: string | number) {
    if (typeof value === "string") {
      console.log(value.toUpperCase()); // Only string methods available here
    } else {
      console.log(value.toFixed(2)); // Only number methods available here
    }
  }
  
  // instanceof type guard
  class Animal {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  
  class Dog extends Animal {
    bark() {
      console.log("Woof!");
    }
  }
  
  function processAnimal(animal: Animal) {
    if (animal instanceof Dog) {
      animal.bark(); // TypeScript knows this is safe
    }
  }`,
    categories: ["TypeScript", "Types"],
  },

  {
    id: uuidv4(),
    title: "TypeScript Advanced Type Guards",
    description:
      "Custom type guards and property checks for complex scenarios.",
    codeSnippet: `// in operator as type guard
  interface Bird {
    fly(): void;
  }
  
  interface Fish {
    swim(): void;
  }
  
  function move(pet: Bird | Fish) {
    if ("fly" in pet) {
      pet.fly();
    } else {
      pet.swim();
    }
  }
  
  // Custom type predicates
  function isString(value: unknown): value is string {
    return typeof value === "string";
  }
  
  function processInput(input: unknown) {
    if (isString(input)) {
      // TypeScript knows input is a string here
      return input.toLowerCase();
    }
    return String(input);
  }
  
  // Discriminated unions
  type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; size: number };
  
  function getArea(shape: Shape): number {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.size ** 2;
    }
  }`,
    categories: ["TypeScript", "Types"],
  },
  // For loop examples
  {
    id: uuidv4(),
    title: "Basic For Loops",
    description: "Standard for loops and their variations.",
    codeSnippet: `// Standard for loop
  for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
  }
  
  // Loop with multiple variables
  for (let i = 0, j = 10; i < 5; i++, j--) {
    console.log(i, j); // 0 10, 1 9, 2 8, 3 7, 4 6
  }
  
  // Loop control statements
  for (let i = 0; i < 10; i++) {
    if (i === 3) continue; // Skip iteration when i is 3
    if (i === 7) break;    // Exit loop when i is 7
    console.log(i);        // 0, 1, 2, 4, 5, 6
  }
  
  // Nested loops with labeled statements
  outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) {
        break outerLoop; // Break out of both loops
      }
      console.log(\`\${i},\${j}\`); 
    }
  }
  // Logs: "0,0", "0,1", "0,2", "1,0"`,
    categories: ["Fundamentals"],
  },

  {
    id: uuidv4(),
    title: "Modern For Loop Variations",
    description: "ES6+ methods for iterating through data structures.",
    codeSnippet: `// for...of loop (iterates over values in iterables)
  const colors = ['red', 'green', 'blue'];
  for (const color of colors) {
    console.log(color); // 'red', 'green', 'blue'
  }
  
  // for...in loop (iterates over enumerable properties)
  const person = { name: 'John', age: 30, job: 'developer' };
  for (const key in person) {
    console.log(\`\${key}: \${person[key]}\`); // "name: John", etc.
  }
  
  // forEach method for arrays
  ['a', 'b', 'c'].forEach((letter, index) => {
    console.log(\`\${index}: \${letter}\`); // "0: a", "1: b", "2: c"
  });
  
  // Iterating through Maps
  const map = new Map([['name', 'Alice'], ['age', 30]]);
  for (const [key, value] of map) {
    console.log(\`\${key}: \${value}\`);
  }
  
  // Iterating through Sets
  const set = new Set([1, 2, 3]);
  for (const value of set) {
    console.log(value);
  }`,
    categories: ["Fundamentals", "ES6"],
  },

  // Object.entries example
  {
    id: uuidv4(),
    title: "Object.entries for Object Iteration",
    description:
      "Object.entries() creates an array of key-value pairs from an object, making it easy to iterate through objects and transform them.",
    codeSnippet: `const user = {
  name: 'Alice',
  age: 28,
  role: 'Developer'
};

// Basic usage - get array of [key, value] pairs
const entries = Object.entries(user);
console.log(entries);
// [['name', 'Alice'], ['age', 28], ['role', 'Developer']]

// Iterating through key-value pairs
for (const [key, value] of Object.entries(user)) {
  console.log(\`\${key}: \${value}\`);
}

// Converting between objects and Maps
const userMap = new Map(Object.entries(user));
console.log(userMap.get('name')); // 'Alice'

// Convert back to object from Map
const backToObject = Object.fromEntries(userMap);
console.log(backToObject); // { name: 'Alice', age: 28, role: 'Developer' }

// Filtering object properties
const filteredObject = Object.fromEntries(
  Object.entries(user).filter(([key, value]) => 
    typeof value === 'string'
  )
);
console.log(filteredObject); // { name: 'Alice', role: 'Developer' }`,
    categories: ["Objects", "ES6"],
  },

  {
    id: uuidv4(),
    title: "Redux and State Management Options",
    description:
      "Comparing different state management solutions for React applications.",
    codeSnippet: `// Redux: A predictable state container
// Pros: Centralized store, time-travel debugging, middleware support, large ecosystem
// Cons: Verbose boilerplate, steep learning curve, potentially overkill for small apps

// React-Redux usage
import { Provider, useSelector, useDispatch } from 'react-redux';
function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
    </div>
  );
}

// Zustand: Minimalist approach
// Pros: Minimal boilerplate, no providers needed, hooks-first API, flexible

// Other options:
// - React Context API: Built-in React solution, no devtools, no middleware
// - MobX: Observable-based state management, less boilerplate than Redux`,
    categories: ["React", "State Management"],
  },

  // Add before the final sort() call

  {
    id: uuidv4(),
    title: "Memoization for Performance",
    description:
      "Memoization is a technique that stores the results of expensive function calls to speed up subsequent calls with the same inputs.",
    codeSnippet: `// Basic memoization implementation

// Real-world use cases - Expensive API calls with same parameters
const fetchUserData = memoize(async (userId) => {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
});

import { useMemo } from 'react';

function MyComponent({ data }) {
  const processedData = useMemo(() => {
    // Expensive calculation
    return expensiveCalculation(data);
  }, [data]); // Only recalculate when data changes
}

// Alternatives to manual memoization:
// 1. useCallback in React for memoizing functions

// Memoization drawbacks:
// - Memory usage increases as cache grows
// - Not suitable for functions with side effects`,
    categories: ["Performance", "Patterns"],
  },
].sort((a, b) => {
  const categoryA = a.categories[0] || "";
  const categoryB = b.categories[0] || "";
  return categoryA.localeCompare(categoryB);
});
