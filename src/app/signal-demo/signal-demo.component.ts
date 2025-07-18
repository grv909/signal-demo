import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  imports: [],
  templateUrl: './signal-demo.component.html',
  styleUrl: './signal-demo.component.scss',
})
export class SignalDemoComponent {
  greetings = signal<string>('Signal World');
  name = signal<string>('Gaurav');
  location = signal<string>('Canada');
  firstName = signal<string>('Naruto');
  lastName = signal<string>('Uchiha');
  email = signal<string>('abcd@gmail.com');

  welcomeMessage = computed(
    () => `Welcome ${this.name()}  to ${this.greetings()}`
  );

  fullName = computed(
    () => `${this.firstName().trim()} ${this.lastName().trim()}`
  );

  formValid = computed(
    () =>
      this.firstName().trim().length > 0 &&
      this.lastName().trim().length > 0 &&
      this.email().includes('@')
  );

  logForm = effect(() => {
    if (this.formValid()) {
      console.log(`valid form submitted by ${this.fullName()}`);
    }
  });

  setMessage(message: string) {
    this.greetings.set(message);
  }

  updateMessage(message: string) {
    this.greetings.update((prev) => prev + message);
  }

  welcomeEffect = effect(() => {
    if (this.name().length > 0) {
      console.log('Welcome user ', this.name());
    }
  });

  locationEffect = effect(() => {
    if (this.location() === 'India') {
      alert('Location is set to India');
    }
  });

  changeLocation(country: string) {
    this.location.set(country);
  }
}
