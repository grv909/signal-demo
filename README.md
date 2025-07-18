## SignalDemoComponent Setup (Day 1)

### What I Did

- Scaffolded a new Angular 17+ project using Angular CLI v17.3.10.
- Generated a `SignalDemoComponent` using `ng g c signal-demo`.
- Created a `signal<string>` in the component and bound it to the template.

### Key Learning

> ⚠️ Signals must be **invoked as functions** in templates (e.g. `greeting()`), not referenced as variables.

```ts
greeting = signal("Hi"); // Correct
```

## set and update Method (Day 2)

### What I Did

- Implemented set method
- Implemented update method

```ts
setMessage(message: string) {
    this.greetings.set(message); // Set Method
  }
```

```ts
 updateMessage(message: string) {
    this.greetings.update((prev) => prev + message); //update Method
  }
```

## Signals: `.set()` vs `.update()`

| Method      | Description                            | Example Usage                                 |
| ----------- | -------------------------------------- | --------------------------------------------- |
| `.set()`    | Replaces the signal’s value completely | `this.greetings.set('Hello')`                 |
| `.update()` | Modifies the value based on previous   | `this.greetings.update(prev => prev + ' hi')` |

### Reactive Updates (No ChangeDetectorRef Needed!)

Angular Signals push changes **reactively**. Unlike `BehaviorSubject` or `@Input()`, there’s:

- No need to inject `ChangeDetectorRef`
- No call to `markForCheck()` or `detectChanges()`

The DOM auto-renders on signal changes

# 📘 Day 3 – Core Concepts of `computed()` in Angular Signals

---

## 🧠 What Is a `computed()` Signal?

In Angular’s signal system, a `computed()` is a **read-only derived signal**.  
It produces a value based on **other signals** and **automatically recalculates** when any of its dependencies change.

> Think of it as a _formula cell in a spreadsheet_: if any input cell changes, the formula cell updates automatically.

---

## ⚙️ How `computed()` Works – The Mental Model

When you define a `computed()`, Angular tracks all the signals you access **inside the function body**. These become _dependencies_. When **any dependency changes**, Angular re-runs the computation function and updates the computed signal.

### 🧩 Core Properties of `computed()`:

- It is **reactive** – auto-updates on dependency change.
- It is **readonly** – you cannot `.set()` or `.update()` it.
- It is **lazy** – it doesn’t recalculate until it’s accessed (like in the template).
- It is **tracked by Angular** – works naturally with the change detection system.

---

## 🔄 Relationship: `signal()` vs `computed()` vs `.update()`

| Concept       | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| `signal<T>()` | A writable, reactive state holding a current value of type `T`.    |
| `.set(value)` | Replaces the signal’s value.                                       |
| `.update(fn)` | Mutates the signal’s value based on the previous state.            |
| `computed()`  | Derives a new read-only signal based on one or more other signals. |

---

## 🧪 Example Scenario

Let’s assume we have two base signals:

```ts
name = signal("Gaurav");
greetings = signal("Signal World");

welcomeMessage = computed(() => `Welcome ${this.name()}  to ${this.greetings()}`);
```

```html
<p>your name: {{ name() }}</p>
<p>{{ welcomeMessage() }}</p>

<input [value]="name()" (input)="name.set($any($event.target).value)" />
```

📌 How Input Binding Works

```html
<input [value]="name()" (input)="name.set($any($event.target).value)" />
```

[value]="name()" binds the input’s visible value to the name signal

(input)="..." updates the signal every time the user types

This triggers computed() to recalculate, which updates the template

It's a reactive loop:
User input → name.set() → computed() recalculates → DOM updates {{ welcomeMessage() }}

> signal()
> Source of truth

Writable state

.set() / .update()
Modify signal manually

Used in event handlers or logic flows

computed()
Automatically derives values from signals

Cannot be changed directly

Keeps templates and business logic clean and declarative

Why computed() Matters in Angular
Encourages separation of reactive state vs derived state

Eliminates imperative recalculation

Reduces boilerplate, subscriptions, and manual DOM sync

Improves testability and clarity by expressing intent directly

---

## ⚙️ How `computed()` Works – The Mental Model

When we define a `computed()`, Angular tracks all the signals you access **inside the function body**. These become _dependencies_. When **any dependency changes**, Angular re-runs the computation function and updates the computed signal.

### Core Properties of `computed()`:

- It is **reactive** – auto-updates on dependency change.
- It is **readonly** – we cannot `.set()` or `.update()` it.
- It is **lazy** – it doesn’t recalculate until it’s accessed (like in the template).
- It is **tracked by Angular** – works naturally with the change detection system.

---

| Feature             | `.update()`                           | `computed()`                              |
| ------------------- | ------------------------------------- | ----------------------------------------- |
| Manual or automatic | 🔧 Manual function call               | ⚙️ Automatic dependency tracking          |
| Return value type   | Same type as signal (`T`)             | Derived/calculated type                   |
| DOM reaction        | Updates signal, requires view binding | DOM auto-updates when dependencies change |
| Use case            | Modify internal value                 | Derive new values from other signals      |

```ts
// update requires you to call it explicitly
this.name.update((prev) => prev + " Singh");
```

```ts
// computed updates automatically when this.name() changes
this.fullName = computed(() => `${this.name()} Singh`);
```

### 🧩 Core Properties of `computed()`:

- ✅ **Reactive** – auto-updates on dependency change
- ✅ **Readonly** – cannot be set manually
- ✅ **Lazy** – recalculates only when accessed
- ✅ **Tracked** – Angular knows what depends on what

---

## 🔁 What Happens If You Nest `computed()` Signals?

You can nest `computed()` signals—that is, define one computed signal based on another. Angular will **transparently track all indirect dependencies**.

### ✅ Example

```ts
name = signal("Gaurav");

greeting = computed(() => `Hi ${this.name()}`);
shoutedGreeting = computed(() => this.greeting().toUpperCase());
```

| Concept       | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| `signal<T>()` | A writable, reactive state holding a current value of type `T`.    |
| `.set(value)` | Replaces the signal’s value.                                       |
| `.update(fn)` | Mutates the signal’s value based on the previous state.            |
| `computed()`  | Derives a new read-only signal based on one or more other signals. |

# Day 4 - Effects in Signals

- Effects help in managing side effects such as logging , alerts, service calls

```ts
logEffect = effect(() => {
  if (this.name().trim().length > 0) {
    console.log(`👋 Welcome, ${this.name()}!`);
  }
});
```

- Use If statement as guard to avoid unnecessary side effects

| Concept            | Description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| `effect(() => {})` | Runs when any accessed signal inside changes                                        |
| Side Effects       | Logging, alerts, animations, service calls — anything **outside the signal system** |
| Cleanup            | Angular **automatically tears down** and re-subscribes to dependencies              |
| Guards             | Use `if` blocks inside to avoid unnecessary side effects                            |

### Use case of effect() and computed()

| Use Case                              | Use `computed()` | Use `effect()`                  |
| ------------------------------------- | ---------------- | ------------------------------- |
| Deriving new value                    | ✅ Yes           | ❌ No                           |
| Logging, alerting, calling APIs       | ❌ No            | ✅ Yes                          |
| Mutating outside world (DOM, console) | ❌ Never         | ✅ Always                       |
| Called only when accessed             | ✅ Lazy          | ❌ Runs immediately & on change |
