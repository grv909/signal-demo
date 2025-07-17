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

  welcomeMessage = computed(
    () => `Welcome ${this.name()}  to ${this.greetings()}`
  );

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
