import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/post.model';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  template: `
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div *ngIf="loading" 
           class="min-h-[400px] flex flex-col items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p class="mt-4 text-gray-600">Loading posts...</p>
      </div>

      <div *ngIf="error" 
           class="min-h-[400px] flex items-center justify-center px-4">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <p class="text-red-600">{{ error }}</p>
          <button 
            (click)="loadPosts()" 
            class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>

      <div *ngIf="!loading && !error && posts.length === 0" 
           class="min-h-[400px] flex items-center justify-center">
        <p class="text-gray-600">No posts available at the moment.</p>
      </div>

      <div *ngIf="!loading && !error && posts.length > 0" 
           class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <app-post-card *ngFor="let post of posts; trackBy: trackByPostId" [post]="post"></app-post-card>
      </div>

      <div *ngIf="!loading && !error && posts.length > 0" 
           class="mt-6 sm:mt-8 flex justify-center items-center gap-3 sm:gap-4">
        <button 
          [disabled]="currentPage == 1 || loading"
          (click)="changePage(currentPage - 1)"
          class="px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base">
          Previous
        </button>
        <div class="flex items-center gap-2">
          <span class="px-3 sm:px-4 py-2 bg-white rounded-lg shadow text-sm sm:text-base">
            Page {{ currentPage }}
          </span>
        </div>
        <button 
          [disabled]="loading"
          (click)="changePage(currentPage + 1)"
          class="px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base">
          Next
        </button>
      </div>
    </div>
  `
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  loading = false;
  error = '';
  currentPage = 1;
  private destroy$ = new Subject<void>();

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadPosts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPosts() {
    this.loading = true;
    this.error = '';
    
    this.blogService.getPosts(this.currentPage)
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.loading = false;
          if (posts.length === 0 && this.currentPage > 1) {
            this.currentPage--;
            this.loadPosts();
          }
        },
        error: (err) => {
          this.error = err;
          this.loading = false;
          this.posts = [];
        }
      });
  }

  changePage(page: number) {
    if (page < 1){
      return;
    } else{
      this.currentPage = page;
      this.loadPosts();
    }

  }

  trackByPostId(index: number, post: Post): number {
    return post.id; // Ensure each item has a unique 'id'
  }
}