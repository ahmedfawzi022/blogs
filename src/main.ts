import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { PostListComponent } from './app/components/post-list/post-list.component';
import { provideClientHydration } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostListComponent],
  template: `
 <main class="min-h-screen bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div class="text-center sm:mb-12 bg-header-bg lg:py-24 lg:pb-24">
          <p class="text-purple-600 font-medium mb-2">Our blog</p>
          <h1 class="text-4xl font-bold text-[#333333] mb-4">Resources and insights</h1>
          <p class="text-gray-600">The latest industry news, interviews, technologies, and resources.</p>
          
          <div class="mt-8 max-w-md mx-auto">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search" 
                class="w-full px-4 py-2 border border-gray-200 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
              <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      <app-post-list></app-post-list>
      </div>
    </main>
  `
})
export class App { }

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideClientHydration()
  ]
}).catch(err => console.error(err));