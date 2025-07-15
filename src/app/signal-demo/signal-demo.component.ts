import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  imports: [],
  templateUrl: './signal-demo.component.html',
  styleUrl: './signal-demo.component.scss',
})
export class SignalDemoComponent {
  greetings = signal<string>('Signal World');

  setMessage(message: string) {
    this.greetings.set(message);
  }

  updateMessage(message: string) {
    this.greetings.update((prev) => prev + message);
  }
}
