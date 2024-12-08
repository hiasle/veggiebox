import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'app-sidebar-button',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './sidebar-button.component.html',
    styleUrl: './sidebar-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarButtonComponent {
  @Input()
  icon!: IconDefinition;

  @Input()
  title!: string;
}
