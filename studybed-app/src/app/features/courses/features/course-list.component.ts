import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { CourseModel } from "../models/course.model";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { RouterLink } from "@angular/router";
import { CourseService } from "../service/course.service";

@Component({
  selector: "app-course-list",
  standalone: true,
  imports: [MatListModule, MatChipsModule, RouterLink],
  template: `
    <mat-nav-list class="max-w-4xl">
      @for( course of courseList(); track course.id ){
      <mat-list-item
        lines="3"
        class="!h-24"
        [routerLink]="['content', course.url_path]"
      >
        <a
          matListItemTitle
          class="pl-2"
          [routerLink]="['content', course.url_path]"
          >{{ course.metadata.title }}</a
        >
        <div>
          <mat-chip-listbox>
            @for (tag of course.metadata.tags; track tag){
            <mat-chip-option
              [selectable]="false"
              selected
              role="listitem"
              color="accent"
              >{{ tag }}</mat-chip-option
            >
            }
          </mat-chip-listbox>
        </div>
        <span matListItemMeta>Auteur: {{ course.metadata.author }}</span>
      </mat-list-item>
      }
    </mat-nav-list>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
  public courseList = toSignal(inject(CourseService).getCourses(), {
    initialValue: [],
  });
}
