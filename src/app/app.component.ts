import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from './services/loader.service';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  title = 'erp-system';
  loader$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.loader$ = this.loaderService.loading$;
  }

}
