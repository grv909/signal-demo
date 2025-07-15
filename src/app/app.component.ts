import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalDemoComponent } from './signal-demo/signal-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignalDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'signal-demo';
}
