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
