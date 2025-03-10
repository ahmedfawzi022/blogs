import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { DatePipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor],
  template: `
    <article 
      (click)="navigateToPost()"
      class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div class="relative">
        <img
          *ngIf="post.cover_image"
          [src]="post.cover_image"
          [alt]="post.title"
          class="w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover"
        />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 hidden sm:block">
        </div>
      </div>
      <div class="p-4 sm:p-6">
        <h2 class="text-xl font-semibold mb-2 line-clamp-2">{{ post.title }}</h2>
        

        <p class="text-gray-600 mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
          {{ post.description }}
        </p>

                <div class="flex items-center mb-4">
          <img
            [src]="post.user.profile_image"
            [alt]="post.user.name"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{{ post.user.name }}</p>
            <p class="text-xs sm:text-sm text-gray-500">
              {{ post.published_at | date:'mediumDate' }}
            </p>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    article {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .p-4, .p-6 {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class PostCardComponent {
  @Input() post!: Post;

  navigateToPost() {
    window.open(this.post.url, '_blank');
  }
}